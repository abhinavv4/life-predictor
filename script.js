document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // --- 1. GET & VALIDATE INPUTS ---
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const dobInput = document.getElementById("dob");

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  // Validation: Check for invalid numbers or empty dates
  if (!height || !weight || height <= 0 || weight <= 0 || !dobInput.value) {
    // Ideally, show this error on the page rather than an alert
    alert("Please enter a valid Date of Birth, Height, and Weight!"); 
    return;
  }

  // --- 2. BMI CALCULATION ---
  // Formula: weight (kg) / [height (m)]^2
  const bmi = weight / Math.pow(height / 100, 2);
  let bmiCategory = "";
  let bmiScore = 0;

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiScore = 3;
  } else if (bmi < 25) {
    bmiCategory = "Normal Weight";
    bmiScore = 5;
  } else if (bmi < 30) {
    bmiCategory = "Overweight";
    bmiScore = 3;
  } else if (bmi < 35) {
    bmiCategory = "Obese";
    bmiScore = 2;
  } else {
    bmiCategory = "Severely Obese";
    bmiScore = 1;
  }

  // --- 3. TOTAL SCORE CALCULATION ---
  let total = bmiScore;
  
  // List of IDs for your select/input fields
  const fields = [
    "food", "activity", "stress", "sleep", "illness", 
    "screen", "fap", "mental", "smoking", "alcohol", "drugs", "water"
  ];
  
  fields.forEach(id => {
    const el = document.getElementById(id);
    // Safety check: ensure element exists and has a value, otherwise add 0
    if (el && el.value) {
      total += parseInt(el.value, 10);
    }
  });

  // --- 4. ADVICE GENERATION ---
  // Helper function to safely get text from a <select> or default to value
  const getSelectText = (id) => {
    const el = document.getElementById(id);
    if (el && el.selectedOptions && el.selectedOptions.length > 0) {
      return el.selectedOptions[0].text;
    }
    return "Unknown";
  };

  const mentalValue = parseInt(document.getElementById("mental")?.value || 0, 10);
  let mentalTips = "";

  switch (mentalValue) {
    case 5: mentalTips = "Keep doing what you love! Your mindset is iron."; break;
    case 4: mentalTips = "Stay connected with friends; socialization is key."; break;
    case 3: mentalTips = "Try 10 mins of meditation and prioritize sleep."; break;
    case 2: mentalTips = "Consider talking to a therapist; it really helps."; break;
    case 1: mentalTips = "You are not alone. Please seek professional support."; break;
    default: mentalTips = "Take a deep breath and focus on today.";
  }

  let quality = "", min = 0, max = 0, generalTips = "";

  if (total >= 55) {
    quality = "🔥 Excellent";
    min = 85; max = 100; // Increased max cap slightly
    generalTips = "You're a legend! Keep crushing it.";
  } else if (total >= 45) {
    quality = "💪 Good";
    min = 75; max = 85;
    generalTips = "Solid habits. Tweak diet and sleep to level up.";
  } else if (total >= 30) {
    quality = "⚠️ Average";
    min = 65; max = 75;
    generalTips = "Okay, but cut the bad habits and move more.";
  } else {
    quality = "🚨 Poor";
    min = 50; max = 65;
    generalTips = "Time to reset. Drink water, walk daily, cut junk.";
  }

  // --- 5. DEATH DATE CALCULATION ---
  const dob = new Date(dobInput.value);
  const randomLife = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Create a new date object based on DOB
  let deathDate = new Date(dob);
  deathDate.setFullYear(dob.getFullYear() + randomLife);
  
  // Randomize the exact day (0 to 365)
  const randomDays = Math.floor(Math.random() * 365);
  deathDate.setDate(deathDate.getDate() + randomDays);

  // Check if date is in the past (oops logic)
  const today = new Date();
  let deathTitle = "☠️ ESTIMATED END";
  let deathMessage = "";

  if (deathDate < today) {
    deathMessage = "👻 You are statistically a ghost (or very lucky!)";
  } else {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    deathMessage = "💀 " + deathDate.toLocaleDateString('en-IN', options);
  }

  // --- 6. RENDER RESULT ---
  const resultDiv = document.getElementById("result");
  
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h2>🧠 Final Analysis</h2>
    <div class="result-grid" style="display: grid; gap: 10px;">
        <p><b>Lifestyle Score:</b> ${total} / 65</p>
        <p><b>Quality:</b> ${quality}</p>
        <p><b>BMI:</b> ${bmi.toFixed(2)} (${bmiCategory})</p>
        <p><b>Self-Control:</b> ${getSelectText("fap")}</p>
        <p><b>Mental State:</b> ${getSelectText("mental")}</p>
        <p><b>Est. Lifespan:</b> ${min} – ${max} years</p>
    </div>
    <hr style="margin: 15px 0; border: 0; border-top: 1px solid #ccc;">
    <p class="death-date" style="font-size: 1.2em; color: #d9534f;">
        <b>${deathTitle}:</b> ${deathMessage}
    </p>
    <p style="margin-top:15px; padding:15px; background:rgba(0,0,0,0.05); border-left: 5px solid #007bff; border-radius:4px;">
      <b>💡 Advice:</b> ${generalTips} <br><br>
      <i>Mental Note: ${mentalTips}</i>
    </p>
  `;

  // UX: Smooth scroll to the result
  resultDiv.scrollIntoView({ behavior: 'smooth' });
});
