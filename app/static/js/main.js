document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

function calculateBMI() {
  // Get input values
  var height = parseFloat(document.getElementById("height").value);
  var weight = parseFloat(document.getElementById("weight").value);

  // Check if inputs are valid numbers
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    alert("Please enter valid height and weight.");
    return;
  }

  // Calculate BMI
  var bmi = weight / ((height / 100) ** 2);

  // Get the selected radio button
  var selectedRadioButton = document.querySelector('input[name="options"]:checked');

  // Check if a radio button is selected

console.log(selectedRadioButton.value)
  // Declare messages outside of the if-else blocks
  var messages;


  // for male
  // Interpret BMI category
if(selectedRadioButton.value=='Male'){
  if (bmi < 18.5 ) {
    messages = ["Male-Underweight ( BMI less than 18.5 )",
  "Breakfast:",
    "Oatmeal with fruits and nuts (350_calories)",
    "Whole grain toast with avocado (300_calories)",
    "Greek yogurt with honey and granola (250_calories)",
    "Scrambled eggs with cheese and spinach (200_calories)",
    "Banana and peanut butter smoothie (400_calories)",
    "Lunch:",
    "Grilled chicken sandwich with veggies (350 calories)",
    "Quinoa salad with mixed vegetables (300 calories)",
    "Tuna wrap with whole grain tortilla (250 calories)",
    "Lentil soup with whole grain bread (200 calories)",
    "Pasta with tomato sauce and cheese (400 calories)",
    "Dinner:",
    "Grilled salmon with quinoa and veggies (350 calories)",
    "Stir-fried tofu with brown rice (300 calories)",
    "Beef stew with potatoes and carrots (250 calories)",
    "Baked chicken with sweet potatoes (200 calories)",
    "Shrimp pasta with garlic bread (400 calories)"
    ];
    startAnimation(messages);
  } else if (bmi >= 18.5 && bmi <= 24.9) {

    messages = ["Male - Normal weight (BMI between 18.5 and 24.9)",
    "Breakfast:",
    "Oatmeal with fruits (250 calories)",
    "Whole grain toast with avocado (200 calories)",
    "Greek yogurt with honey (150 calories)",
    "Scrambled eggs with spinach (150 calories)",
    "Banana smoothie (200 calories)",
    "Lunch:",
    "Grilled chicken sandwich (300 calories)",
    "Quinoa salad with vegetables (250 calories)",
    "Tuna wrap (200 calories)",
    "Lentil soup with bread (200 calories)",
    "Pasta with tomato sauce (300 calories)",
    "Dinner:",
    "Grilled salmon with quinoa (300 calories)",
    "Stir-fried tofu with brown rice (250 calories)",
    "Beef stew with potatoes (200 calories)",
    "Baked chicken with sweet potatoes (250 calories)",
    "Shrimp pasta (300 calories)"];
    startAnimation(messages);
  } else if (bmi >= 25 && bmi <= 29.9) {
    messages = ["Male - Overweight (BMI between 25 and 29.9)",
    "Breakfast:",
    "Oatmeal with fruits (200 calories)",
    "Whole grain toast (150 calories)",
    "Greek yogurt (100 calories)",
    "Scrambled eggs (100 calories)",
    "Banana (100 calories)",
    "Lunch:",
    "Grilled chicken salad (250 calories)",
    "Quinoa salad (200 calories)",
    "Tuna wrap (150 calories)",
    "Lentil soup (150 calories)",
    "Pasta with tomato sauce (200 calories)",
    "Dinner:",
    "Grilled salmon with veggies (250 calories)",
    "Stir-fried tofu with brown rice (200 calories)",
    "Beef stew (150 calories)",
    "Baked chicken with veggies (200 calories)",
    "Shrimp salad (200 calories)"];
    startAnimation(messages);
  } else if (bmi>=30){
    messages = ["Male - Obesity (BMI of 30 or greater)",
    "Breakfast:",
    "Oatmeal (150 calories)",
    "Whole grain toast (100 calories)",
    "Greek yogurt (100 calories)",
    "Scrambled egg whites (50 calories)",
    "Banana (100 calories)",
    "Lunch:",
    "Grilled chicken salad (200 calories)",
    "Quinoa salad (150 calories)",
    "Tuna salad (100 calories)",
    "Lentil soup (100 calories)",
    "Veggie pasta (150 calories)",
    "Dinner:",
    "Grilled salmon with veggies (200 calories)",
    "Stir-fried tofu with veggies (150 calories)",
    "Veggie stew (100 calories)",
    "Baked chicken with veggies (150 calories)",
    "Shrimp salad (150 calories)"];
    startAnimation(messages);
  }

}
else{
// for Female 
  // Interpret BMI category
  if (bmi < 18.5 ) {
    messages = ["Female - Underweight(BMI_less_than_18.5)",
    "Breakfast:",
    "Oatmeal with fruits and nuts (300 calories)",
    "Whole grain toast with avocado (250 calories)",
    "Greek yogurt with honey and granola (200 calories)",
    "Scrambled eggs with cheese and spinach (150 calories)",
    "Banana and peanut butter smoothie (350 calories)",
    "Lunch:",
    "Grilled chicken sandwich with veggies (300 calories)",
    "Quinoa salad with mixed vegetables (250 calories)",
    "Tuna wrap with whole grain tortilla (200 calories)",
    "Lentil soup with whole grain bread (150 calories)",
    "Pasta with tomato sauce and cheese (350 calories)",
    "Dinner:",
    "Grilled salmon with quinoa and veggies (300 calories)",
    "Stir-fried tofu with brown rice (250 calories)",
    "Beef stew with potatoes and carrots (200 calories)",
    "Baked chicken with sweet potatoes (150 calories)",
    "Shrimp pasta with garlic bread (350 calories)"];
    startAnimation(messages);
  } else if (bmi >= 18.5 && bmi <= 24.9) {

    messages = ["Female - Normal weight (BMI between 18.5 and 24.9)",
    "Breakfast:",
    "Oatmeal with fruits (200 calories)",
    "Whole grain toast with avocado (150 calories)",
    "Greek yogurt with honey (100 calories)",
    "Scrambled eggs with spinach (100 calories)",
    "Banana smoothie (150 calories)",
    "Lunch:",
    "Grilled chicken sandwich (250 calories)",
    "Quinoa salad with vegetables (200 calories)",
    "Tuna wrap (150 calories)",
    "Lentil soup with bread (150 calories)",
    "Pasta with tomato sauce (250 calories)",
    "Dinner:",
    "Grilled salmon with quinoa (250 calories)",
    "Stir-fried tofu with brown rice (200 calories)",
    "Beef stew with potatoes (150 calories)",
    "Baked chicken with sweet potatoes (150 calories)",
    "Shrimp pasta (250 calories)"];
    startAnimation(messages);
  } else if (bmi >= 25 && bmi <= 29.9) {
    messages = ["Female - Overweight (BMI between 25 and 29.9)",
    "Breakfast:",
    "Oatmeal with fruits (150 calories)",
    "Whole grain toast (100 calories)",
    "Greek yogurt (50 calories)",
    "Scrambled eggs (50 calories)",
    "Banana (100 calories)",
    "Lunch:",
    "Grilled chicken salad (200 calories)",
    "Quinoa salad (150 calories)",
    "Tuna salad (100 calories)",
    "Lentil soup (100 calories)",
    "Veggie pasta (150 calories)",
    "Dinner:",
    "Grilled salmon with veggies (200 calories)",
    "Stir-fried tofu with veggies (150 calories)",
    "Veggie stew (100 calories)",
    "Baked chicken with veggies (150 calories)",
    "Shrimp salad (150 calories)",
    ];
    startAnimation(messages);
  } else if(bmi >=30) {
    messages = ["Female - Obesity (BMI of 30 or greater)",
    "Breakfast:",
    "Oatmeal (100 calories)",
    "Whole grain toast (50 calories)",
    "Greek yogurt (50 calories)",
    "Scrambled egg whites (50 calories)",
    "Banana (50 calories)",
    "Lunch:",
    "Grilled chicken salad (150 calories)",
    "Quinoa salad (100 calories)",
    "Tuna salad (50 calories)",
    "Lentil soup (50 calories)",
    "Veggie pasta (100 calories)",
    "Dinner:",
    "Grilled salmon with veggies (150 calories)",
    "Stir-fried tofu with veggies (100 calories)",
    "Veggie stew (50 calories)",
    "Baked chicken with veggies (100 calories)",
    "Shrimp salad (100 calories)"];
    startAnimation(messages);
  }
}
}
const chatBox = document.getElementById("chat");
const generateBtn = document.getElementById("generateBtn");

function simulateChat(messages) {
    messages.forEach((message, index) => {
        setTimeout(() => {
            const newMessage = document.createElement("p");
            newMessage.classList.add("message");
            newMessage.textContent = message;
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, index * 1000); // Adjust the delay as needed
    });
}

function startAnimation(messages) {
    // Clear previous content
    chatBox.innerHTML = "";
    // Start the animation
    simulateChat(messages);
}