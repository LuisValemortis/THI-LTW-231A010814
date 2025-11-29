document.addEventListener('DOMContentLoaded', () => {

    // Logic DOMContentLoaded cho bai01.html (Ảnh, Scroll, Features Observer)
    const mainImage = document.getElementById('main-product-display');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newImageSrc = this.getAttribute('data-full-src');
                mainImage.src = newImageSrc;
                mainImage.alt = this.alt;

                thumbnails.forEach(t => t.classList.remove('active'));

                this.classList.add('active');
            });
        });
    }

    const header = document.querySelector('.product-header');
    
    function handleScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

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

    if (featureItems.length > 0) {
        const featureObserver = new IntersectionObserver(observerCallback, observerOptions);

        featureItems.forEach(item => {
            featureObserver.observe(item);
        });
    }
});


// Logic Game Đoán Số (Bài 02)
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

    if (!checkButton) return;

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
            
            confettiContainer.classList.add('active');
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

        confettiContainer.classList.remove('active');
    }
    
    checkButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', resetGame);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });

}

// ------------------------------------------------------------------
// NEW FUNCTIONS FOR ĐỀ THI SỐ 02
// ------------------------------------------------------------------


// 1. Logic for Footer Year
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}


// 2. Logic for About Page (hobbies and prompt)
function initializeAboutPage() {
    const hobbiesSection = document.getElementById('hobbiesSection');
    const hobbyItems = document.querySelectorAll('.hobby-item');

    if (!hobbiesSection) return;

    hobbyItems.forEach(item => {
        item.addEventListener('click', function() {
            const hobbyName = this.textContent.trim();
            
            // Yêu cầu mô tả sở thích từ prompt
            const description = prompt(`Nhập mô tả cho sở thích "${hobbyName}":`);

            if (description && description.trim() !== "") {
                // Thay đổi màu nền của section (ngẫu nhiên để sinh động)
                const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                hobbiesSection.style.backgroundColor = randomColor + '30'; // Thêm độ trong suốt

                // Hiển thị alert
                alert(`Sở thích: ${hobbyName}\nMô tả: ${description}`);
            } else {
                alert(`Bạn đã hủy hoặc không nhập mô tả cho sở thích "${hobbyName}".`);
            }
        });
    });
}

// 3. Logic for Contact Page (Form Validation and LocalStorage)
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('formConfirmation');
    
    if (!form) return;

    function isValidEmail(email) {
        // RegEx đơn giản để kiểm tra email hợp lệ
        return /\S+@\S+\.\S+/.test(email);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Reset errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';
        confirmationMessage.style.display = 'none';

        // Validation logic
        if (name === "") {
            document.getElementById('nameError').textContent = 'Họ tên không được để trống.';
            isValid = false;
        }

        if (email === "") {
            document.getElementById('emailError').textContent = 'Email không được để trống.';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Địa chỉ email không hợp lệ.';
            isValid = false;
        }

        if (message === "") {
            document.getElementById('messageError').textContent = 'Nội dung tin nhắn không được để trống.';
            isValid = false;
        }

        if (isValid) {
            // Lưu dữ liệu vào localStorage
            const contactData = {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            // Lấy dữ liệu cũ (nếu có) và thêm dữ liệu mới
            let existingData = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            existingData.push(contactData);
            localStorage.setItem('contactSubmissions', JSON.stringify(existingData));

            // Hiển thị confirm
            form.reset();
            confirmationMessage.textContent = '✅ Cảm ơn bạn, tin nhắn của bạn đã được gửi và lưu trữ cục bộ!';
            confirmationMessage.style.display = 'block';

        }
    });
}

// 4. Logic for Bài 03 - Music Player
const playlist = [
    { title: 'Summer Vibe (Song 1)', artist: 'Artist A', url: 'audio/song1.mp3', image: 'images/music-placeholder.jpg' },
    { title: 'Coding Focus (Song 2)', artist: 'Artist B', url: 'audio/song2.mp3', image: 'images/music-placeholder.jpg' },
    { title: 'Chill Lo-fi (Song 3)', artist: 'Artist C', url: 'audio/song3.mp3', image: 'images/music-placeholder.jpg' }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffling = false;

function initializeMusicPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const playlistUl = document.getElementById('playlist');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackImage = document.getElementById('track-image');
    const musicCard = document.querySelector('.music-card');
    
    if (!audioPlayer) return;

    // Logic rAF cho Equalizer
    let animationFrameId;
    
    function animateEqualizer() {
        if (isPlaying) {
            // Hiệu ứng mượt mà (dùng RequestAnimationFrame)
            musicCard.classList.remove('paused');
        } else {
            musicCard.classList.add('paused'); 
        }
        animationFrameId = requestAnimationFrame(animateEqualizer);
    }

    function loadSong(index) {
        const song = playlist[index];
        audioPlayer.src = song.url;
        trackTitle.textContent = song.title;
        trackArtist.textContent = song.artist;
        trackImage.src = song.image;
        
        // Cập nhật trạng thái active trong playlist UI
        Array.from(playlistUl.children).forEach((li, i) => {
            li.classList.remove('active-song');
            if (i === index) {
                li.classList.add('active-song');
            }
        });
        
        audioPlayer.load();
    }

    function playSong() {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicCard.classList.remove('paused');
        audioPlayer.play();
        // Bắt đầu animation rAF khi phát
        cancelAnimationFrame(animationFrameId); 
        animationFrameId = requestAnimationFrame(animateEqualizer);
    }

    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicCard.classList.add('paused');
        audioPlayer.pause();
        // Không dừng rAF, để CSS animation-play-state: paused xử lý
    }
    
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    function nextSong() {
        if (isShuffling) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentSongIndex); 
            currentSongIndex = nextIndex;
        } else {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
        }
        loadSong(currentSongIndex);
        playSong();
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        playSong();
    }

    function shufflePlaylist() {
        isShuffling = !isShuffling;
        shuffleBtn.classList.toggle('active', isShuffling);
        alert(isShuffling ? 'Chế độ Xáo trộn (Shuffle) đã BẬT.' : 'Chế độ Xáo trộn (Shuffle) đã TẮT.');
    }

    function toggleRepeat() {
        // Toggles giữa Loop bài hiện tại và Loop Playlist (hoặc tắt)
        if (audioPlayer.loop) {
            audioPlayer.loop = false; // Tắt lặp bài hiện tại
            repeatBtn.classList.remove('active');
            alert('Chế độ Lặp lại (Repeat) đã TẮT.');
        } else {
            audioPlayer.loop = true; // Bật lặp bài hiện tại
            repeatBtn.classList.add('active');
            alert('Chế độ Lặp lại (Repeat) bài hiện tại đã BẬT.');
        }
    }

    // Xử lý khi bài hát kết thúc
    audioPlayer.addEventListener('ended', () => {
        if (!audioPlayer.loop) { // Nếu không phải lặp bài hiện tại
            nextSong(); // Tự động chuyển bài
        }
        // Nếu audioPlayer.loop BẬT, trình duyệt sẽ tự lặp lại.
    });

    // Tạo danh sách phát trong DOM
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.setAttribute('data-index', index);
        if (index === currentSongIndex) {
            li.classList.add('active-song');
        }
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlistUl.appendChild(li);
    });

    // Gắn sự kiện điều khiển
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    shuffleBtn.addEventListener('click', shufflePlaylist);
    repeatBtn.addEventListener('click', toggleRepeat);

    // Tải bài hát đầu tiên khi khởi tạo
    loadSong(currentSongIndex);
    pauseSong(); // Mặc định dừng khi mới vào trang
}
