package com.AccountRentalHub.security.services;

import com.AccountRentalHub.models.Order;
import com.AccountRentalHub.models.OrderDetail;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.Base64;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Properties;

@Service
public class EmailService {

    private static final String APPLICATION_NAME = "Web client 1";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    private final String credentialsFilePath;
    private final List<String> scopes;

    public EmailService(@Value("${google.oauth.credentials.path}") String credentialsFilePath,
                        @Value("${google.oauth.scopes}") List<String> scopes) {
        this.credentialsFilePath = credentialsFilePath;
        this.scopes = scopes;
    }

    public void sendResetPasswordEmail(String toEmail, String resetUrl, String username) throws IOException, MessagingException, GeneralSecurityException {
        Gmail service = getGmailService();
        String subject = "Reset Password";
        String htmlContent = "<html><body>" +
                "<p>Tên tài khoản của bạn là: <strong>" + username + "</strong>.</p>" +
                "<p>Để thay đổi mật khẩu, nhấn vào link bên dưới:</p>" +
                "<p><a href=\"" + resetUrl + "\">Reset Password</a></p>" +
                "</body></html>";
        Message message = createMessage(toEmail, subject, htmlContent);
        service.users().messages().send("me", message).execute();
    }

    public void sendOrderPaymentEmail(String toEmail, Order order) throws GeneralSecurityException, IOException, MessagingException {
        Gmail service = getGmailService();
        String subject = "Order Payment";
        StringBuilder htmlContent = new StringBuilder("<html><body>");
        htmlContent.append("<h1>Cám ơn bạn đã đặt hàng tại Vutrukey, dưới đây là thông tin đơn hàng: </h1>")
                .append("<p>Mã đơn hàng: ").append(order.getOrderCode()).append("</p>")
                .append("<p>Ngày đặt đơn: ").append(order.getOrderDate()).append("</p>")
                .append("<p>Trạng thái đơn hàng: ").append(order.getStatus()).append("</p>")
                .append("<p>Tổng tiền: ").append(order.getTotalAmount()).append("VNĐ </p>");
        htmlContent.append("</body></html>");
        Message message = createMessage(toEmail, subject, htmlContent.toString());
        service.users().messages().send("me", message).execute();
    }

    public void sendOrderConfirmationEmail(String toEmail, Order order) throws GeneralSecurityException, IOException, MessagingException {
        Gmail service = getGmailService();
        String subject = "Order Confirmation";
        StringBuilder htmlContent = new StringBuilder("<html><body>");
        htmlContent.append("<h1>Cám ơn bạn đã đặt hàng tại Vutrukey, dưới đây là thông tin đơn hàng: </h1>")
                .append("<p>Mã đơn hàng: ").append(order.getOrderCode()).append("</p>")
                .append("<p>Ngày đặt đơn: ").append(order.getOrderDate()).append("</p>")
                .append("<p>Trạng thái đơn hàng: ").append(order.getStatus()).append("</p>")
                .append("<p>Tổng tiền: ").append(order.getTotalAmount()).append("VNĐ </p>")
                .append("<p>Order Items:</p>")
                .append("<ul>");

        for (OrderDetail detail : order.getOrderDetails()) {
            htmlContent.append("<li>").append(detail.getRentalAccount().getAccountRentalPackage().getName())
                    .append(" - Số lượng: ").append(detail.getQuantity())
                    .append("</li>");
        }

        htmlContent.append("</ul></body></html>");
        Message message = createMessage(toEmail, subject, htmlContent.toString());
        service.users().messages().send("me", message).execute();
    }

    private Message createMessage(String toEmail, String subject, String htmlContent) throws MessagingException, IOException {
        MimeMessage mimeMessage = new MimeMessage(Session.getDefaultInstance(new Properties(), null));
        mimeMessage.setFrom(new InternetAddress("nhmnhat2101.it@gmail.com"));
        mimeMessage.addRecipient(jakarta.mail.Message.RecipientType.TO, new InternetAddress(toEmail));
        mimeMessage.setSubject(subject);
        mimeMessage.setContent(htmlContent, "text/html; charset=utf-8");

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        mimeMessage.writeTo(buffer);
        byte[] bytes = buffer.toByteArray();
        String encodedEmail = Base64.encodeBase64URLSafeString(bytes);
        Message message = new Message();
        message.setRaw(encodedEmail);

        return message;
    }

    private Gmail getGmailService() throws GeneralSecurityException, IOException {
        final NetHttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        Credential credential = getCredentials(httpTransport);
        return new Gmail.Builder(httpTransport, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        InputStream in = EmailService.class.getResourceAsStream(credentialsFilePath);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + credentialsFilePath);
        }
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, scopes)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }
}
