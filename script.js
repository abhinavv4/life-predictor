document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // --- 1. GET INPUTS ---
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const dobInput = document.getElementById("dob");

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0 || !dobInput.value) {
    alert("Please enter valid Date of Birth, Height, and Weight!"); 
    return;
  }

  // --- 2. BMI CALCULATION & ADVICE ---
  const bmi = weight / Math.pow(height / 100, 2);
  let bmiCategory = "";
  let bmiScore = 0;
  let bmiAdvice = ""; 

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiScore = 3;
    bmiAdvice = "You need to fuel up! Focus on calorie-dense, healthy foods and strength training.";
  } else if (bmi < 25) {
    bmiCategory = "Normal Weight";
    bmiScore = 5;
    bmiAdvice = "Your weight is optimal. Keep your current activity level to maintain this balance.";
  } else if (bmi < 30) {
    bmiCategory = "Overweight";
    bmiScore = 3;
    bmiAdvice = "Time to burn some fat! Increase your cardio intensity and cut down on processed sugars.";
  } else if (bmi < 35) {
    bmiCategory = "Obese";
    bmiScore = 2;
    bmiAdvice = "Health Alert: Prioritize fat loss immediately. Combine daily exercise with a strict diet plan.";
  } else {
    bmiCategory = "Severely Obese";
    bmiScore = 1;
    bmiAdvice = "Critical: Please consult a doctor. Your body is under extreme stress.";
  }

  // --- 3. TOTAL SCORE CALCULATION ---
  let total = bmiScore;
  const fields = [
    "food", "activity", "stress", "sleep", "illness", 
    "screen", "fap", "mental", "smoking", "alcohol", "drugs", "water"
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value) total += parseInt(el.value, 10);
  });

  // --- 4. MENTAL & GENERAL ADVICE ---
  const getSelectText = (id) => {
    const el = document.getElementById(id);
    return (el && el.selectedOptions.length > 0) ? el.selectedOptions[0].text : "Unknown";
  };

  const mentalValue = parseInt(document.getElementById("mental")?.value || 0, 10);
  let mentalTips = "";
  
  switch (mentalValue) {
    case 5: mentalTips = "Mental state is strong."; break;
    case 4: mentalTips = "Stay socially connected."; break;
    case 3: mentalTips = "Try meditation for stress."; break;
    case 2: mentalTips = "Consider talking to a therapist."; break;
    case 1: mentalTips = "Seek professional support."; break;
    default: mentalTips = "Take it one day at a time.";
  }

  // --- [UPDATED] DRASTIC IMPACT LOGIC ---
  let quality = "", min = 0, max = 0, generalTips = "";

  if (total >= 58) {
    quality = "🔥 Legendary";
    min = 90; max = 105;
    generalTips = "You are optimizing human potential.";
  } else if (total >= 48) {
    quality = "💪 Good";
    min = 78; max = 89;
    generalTips = "Solid lifestyle foundation.";
  } else if (total >= 35) {
    quality = "⚠️ Risky"; 
    min = 55; max = 75; 
    generalTips = "You are gambling with your health. Changes needed.";
  } else {
    // DRASTIC TIER FOR LOW SCORES
    quality = "🚨 CRITICAL FAILURE";
    min = 35; max = 54; 
    generalTips = "Your lifestyle is a ticking time bomb. Immediate intervention required.";
  }

  // [NEW] PENALTY FOR SEVERE OBESITY
  if (bmiScore === 1) {
      max = Math.min(max, 50); 
      min = Math.min(min, 40);
      generalTips += " (Obesity is drastically capping your timeline)";
  }

  // --- 5. DEATH DATE LOGIC ---
  const dob = new Date(dobInput.value);
  const randomLife = Math.floor(Math.random() * (max - min + 1)) + min;
  let deathDate = new Date(dob);
  deathDate.setFullYear(dob.getFullYear() + randomLife);
  deathDate.setDate(deathDate.getDate() + Math.floor(Math.random() * 365));

  const today = new Date();
  
  let deathMessage = (deathDate < today) 
    ? "💀 You are living on borrowed time. (Statistically Deceased)" 
    : "💀 " + deathDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  // --- 6. RENDER RESULT ---
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h2>🧠 Final Analysis</h2>
    <div class="result-grid">
        <p><b>Lifestyle Score:</b> ${total} / 65</p>
        <p><b>Quality:</b> ${quality}</p>
        <p><b>BMI:</b> ${bmi.toFixed(2)} (${bmiCategory})</p>
        <p><b>Self-Control:</b> ${getSelectText("fap")}</p>
        <p><b>Est. Lifespan:</b> ${min} – ${max} years</p>
    </div>
    <hr style="margin: 15px 0;">
    <p style="color: #d9534f; font-weight: bold; font-size: 1.1em;">☠️ GOING TO... ${deathMessage}</p>
    
    <div style="margin-top:15px; padding:15px; background:rgba(0,0,0,0.05); border-left: 5px solid #d9534f; border-radius:4px;">
      <b>💡 Personalized Advice:</b>
      <ul style="margin: 10px 0 0 20px; padding: 0;">
        <li><b>Body:</b> ${bmiAdvice}</li>
        <li><b>Habits:</b> ${generalTips}</li>
        <li><b>Mind:</b> ${mentalTips}</li>
      </ul>
    </div>
  `;

  resultDiv.scrollIntoView({ behavior: 'smooth' });
});
