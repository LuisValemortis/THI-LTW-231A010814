document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------------
    // 1. LOGIC THANH ĐIỀU HƯỚNG TRÊN MOBILE (SỬA LỖI HAMBURGER MENU)
    // ------------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list'); 

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            // Thêm/Bỏ class 'active' để hiển thị menu
            navList.classList.toggle('active');
        });
    }

    // ------------------------------------------------------------------
    // 2. LOGIC THƯ VIỆN ẢNH (BÀI 01)
    // ------------------------------------------------------------------
    const mainImage = document.getElementById('main-product-display');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Lấy đường dẫn ảnh lớn từ thuộc tính data-full-src
            const newImageSrc = this.getAttribute('data-full-src');
            
            // Cập nhật ảnh chính
            if (mainImage) {
                mainImage.src = newImageSrc;
                mainImage.alt = this.alt;
            }

            // Xóa class 'active' khỏi tất cả thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));

            // Thêm class 'active' vào thumbnail vừa click
            this.classList.add('active');
        });
    });

    // ------------------------------------------------------------------
    // 3. LOGIC HIỆU ỨNG CUỘN HEADER (STICKY/SCROLLED EFFECT)
    // ------------------------------------------------------------------
    const header = document.querySelector('.product-header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            if (header) { 
                header.classList.add('scrolled');
            }
        } else {
            if (header) {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ------------------------------------------------------------------
    // 4. LOGIC ANIMATION HIỆN DẦN (INTERSECTION OBSERVER - BÀI 01)
    // ------------------------------------------------------------------
    const featureItems = document.querySelectorAll('.feature-item');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const featureObserver = new IntersectionObserver(observerCallback, observerOptions);

    featureItems.forEach(item => {
        featureObserver.observe(item);
    });

    // ------------------------------------------------------------------
    // 5. CẬP NHẬT NĂM Ở FOOTER
    // ------------------------------------------------------------------
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});


// ------------------------------------------------------------------
// 6. HÀM GAME ĐOÁN SỐ (BÀI 02)
// ------------------------------------------------------------------
function initializeGuessingGame() {
    const min = 50;
    const max = 150;
    let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let attempts = 0;
    let isGameOver = false;

    const guessInput = document.getElementById('guessInput');
    const checkButton = document.getElementById('checkButton');
    const resultMessage = document.getElementById('resultMessage');
    const attemptCount = document.getElementById('attemptCount');
    const resetButton = document.getElementById('resetButton');
    const confettiContainer = document.getElementById('confetti-container');

    if (!guessInput || !checkButton) return; // Kiểm tra các phần tử cần thiết

    function checkGuess() {
        if (isGameOver) return;

        const guess = parseInt(guessInput.value.trim());

        if (isNaN(guess) || guess < min || guess > max) {
            resultMessage.textContent = `❌ Vui lòng nhập một số hợp lệ trong khoảng ${min} đến ${max}.`;
            resultMessage.className = 'message error';
            return;
        }

        attempts++;
        attemptCount.textContent = attempts;

        if (guess === secretNumber) {
            resultMessage.textContent = `🎉 CHÍNH XÁC! Số bí mật là ${secretNumber}. Bạn đã đoán đúng trong ${attempts} lần!`;
            resultMessage.className = 'message success';
            isGameOver = true;
            checkButton.disabled = true;
            resetButton.style.display = 'block';
            
            if (confettiContainer) confettiContainer.classList.add('active');
        } else if (guess < secretNumber) {
            resultMessage.textContent = '🔽 Quá thấp! Thử lại.';
            resultMessage.className = 'message warning';
        } else { 
            resultMessage.textContent = '🔼 Quá cao! Thử lại.';
            resultMessage.className = 'message warning';
        }
    }

    function resetGame() {
        secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        attempts = 0;
        isGameOver = false;

        attemptCount.textContent = 0;
        resultMessage.textContent = '';
        resultMessage.className = 'message';
        guessInput.value = '';
        checkButton.disabled = false;
        resetButton.style.display = 'none';

        if (confettiContainer) confettiContainer.classList.remove('active');
        console.log("Game đã reset. Số mới: " + secretNumber);
    }
    
    checkButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', resetGame);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });

    console.log("Game đã khởi tạo. Số bí mật đầu tiên: " + secretNumber);
}


// ------------------------------------------------------------------
// 7. HÀM MUSIC PLAYER (BÀI 03) - KHUNG SƯỜN LOGIC
// ------------------------------------------------------------------
function initializeMusicPlayer() {
    console.log("Music Player đang được khởi tạo.");

    const playlist = [
        { title: "Bài Hát Mẫu 1", artist: "Ca Sĩ A", src: "music/track1.mp3", img: "images/thumbnail-1.jpg" },
        { title: "Bài Hát Mẫu 2", artist: "Ca Sĩ B", src: "music/track2.mp3", img: "images/thumbnail-2.jpg" },
        // Thêm các bài hát khác vào đây
    ];

    let currentTrackIndex = 0;
    const audio = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressBar = document.getElementById('progress-bar');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackImage = document.getElementById('track-image');
    const musicCard = document.querySelector('.music-card');
    
    // Nếu không tìm thấy các phần tử cần thiết thì dừng
    if (!audio || !playPauseBtn) return; 

    function loadTrack(index) {
        const track = playlist[index];
        audio.src = track.src;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        trackImage.src = track.img;
        currentTrackIndex = index;
    }

    function playPauseTrack() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.querySelector('i').className = 'fas fa-pause';
            musicCard.classList.remove('paused');
        } else {
            audio.pause();
            playPauseBtn.querySelector('i').className = 'fas fa-play';
            musicCard.classList.add('paused');
        }
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        audio.play();
    }

    // Lắng nghe các sự kiện
    loadTrack(currentTrackIndex);
    playPauseBtn.addEventListener('click', playPauseTrack);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        audio.play();
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress || 0;
        
        // Cập nhật thời gian
        document.getElementById('current-time').textContent = formatTime(audio.currentTime);
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });

    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });

    audio.addEventListener('ended', nextTrack); // Tự động chuyển bài khi kết thúc

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Khởi tạo danh sách phát UI
    const playlistUl = document.getElementById('playlist');
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.setAttribute('data-index', index);
        li.addEventListener('click', () => {
            loadTrack(index);
            audio.play();
        });
        playlistUl.appendChild(li);
    });
}
