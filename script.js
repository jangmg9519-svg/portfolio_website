// ================= 메뉴 Active =================
const menuList = document.querySelectorAll(".header ul li");
if (menuList.length > 0) {
  menuList[0].classList.add("active");
  menuList.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      menuList.forEach((item) => item.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });
}

// ================= 스와이퍼 + 모달 =================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("vsThumbnails");
  const thumbs = Array.from(container.children);
  const modal = document.getElementById("vsVideoModal");
  const modalVideo = document.getElementById("vsModalVideo");
  const closeBtn = modal.querySelector(".vs-close");
  const prevBtn = document.querySelector(".vs-prev");
  const nextBtn = document.querySelector(".vs-next");
  const descText = document.getElementById("vsDesc");

  let currentIndex = 0;
  const thumbMargin = 60;
  const visibleCount = 3;
  const autoDelay = 4000;
  let autoSlide;

  function updateSlider() {
    const wrapper = container.parentElement;
    const thumbWidth = thumbs[0].offsetWidth + thumbMargin;
    const centerIndex = currentIndex + Math.floor(visibleCount / 2);
    const offset =
      centerIndex * thumbWidth - wrapper.offsetWidth / 2 + thumbWidth / 2;
    container.style.transform = `translateX(${-offset}px)`;
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= thumbs.length - visibleCount) {
      currentIndex = currentIndex % (thumbs.length / 2);
      container.style.transition = "none";
      updateSlider();
      setTimeout(() => {
        container.style.transition = "transform 0.5s ease";
      }, 50);
    } else updateSlider();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = thumbs.length / 2 - visibleCount;
      container.style.transition = "none";
      updateSlider();
      setTimeout(() => {
        container.style.transition = "transform 0.5s ease";
      }, 50);
    } else updateSlider();
  }

  thumbs.forEach((t, i) => {
    t.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
      openModal(t.dataset.video, t.dataset.desc);
      resetAuto();
    });
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAuto();
  });
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAuto();
  });

  function startAuto() {
    autoSlide = setInterval(nextSlide, autoDelay);
  }
  function resetAuto() {
    clearInterval(autoSlide);
    startAuto();
  }
  startAuto();

  function openModal(src, desc) {
    modal.style.display = "flex";
    modalVideo.src = src;
    modalVideo.currentTime = 0;
    modalVideo.play();
    descText.textContent = desc;
  }

  function closeModal() {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  }

  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  updateSlider();
});

// Left menu 클릭 시 해당 섹션으로 이동
const leftMenuLinks = document.querySelectorAll(".leftmenu li a");

leftMenuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // 기본 링크 이동 막기
    const target = link.textContent.toLowerCase(); // 클릭 텍스트 소문자
    let sectionId = "";

    switch (target) {
      case "about me":
        sectionId = "menu0";
        break;
      case "skills":
        sectionId = "menu1";
        break;
      case "portfolio":
        sectionId = "menu2";
        break;
      case "contact":
        sectionId = "menu4";
        break;
      default:
        sectionId = "menu0";
    }

    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  });
});
