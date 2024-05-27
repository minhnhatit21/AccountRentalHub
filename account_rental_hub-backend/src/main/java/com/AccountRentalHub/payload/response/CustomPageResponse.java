package com.AccountRentalHub.payload.response;

import java.util.List;

public class CustomPageResponse<T>{
    private List<T> content;
    private PageableResponse pageable;

    public CustomPageResponse(List<T> content, int pageNumber, int pageSize, long totalElements, int totalPages) {
        this.content = content;
        this.pageable = new PageableResponse(pageNumber, pageSize, totalElements, totalPages);
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public PageableResponse getPageable() {
        return pageable;
    }

    public void setPageable(PageableResponse pageable) {
        this.pageable = pageable;
    }
}
