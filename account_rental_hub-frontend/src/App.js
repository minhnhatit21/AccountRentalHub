import './App.css';
import NotificationDropdown from './components/dropdown/notification_dropdown';
import ProfileMenuDropdown from './components/dropdown/profile_dropdown';
import Header from './components/header';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="App">
      <div className='flex min-h-screen overflow-y-auto'>
        <div className='flex-shrink'>
          <div className='relative w-64 h-full'>
            <Sidebar />
          </div>
        </div>
        <div className='flex-shrink w-full'>
          <main>
            <Header/>
            <div class="p-8">
              <h1 class="font-bold mb-8 text-2xl">Dashboard</h1>
              <div class="space-y-8">
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
                <div class="w-full h-48 border-2 border-gray-500 border-dashed rounded-2xl"></div>
              </div>
            </div>
            <footer class="bg-red-400 p-8">footer</footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
