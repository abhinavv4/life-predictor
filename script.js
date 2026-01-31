document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const resultDiv = document.getElementById("result");
  const loadingDiv = document.getElementById("loading");
  const btn = document.getElementById("analyzeBtn");
  
  // UI Reset
  resultDiv.style.display = "none";
  loadingDiv.style.display = "block";
  btn.disabled = true;

  // Fake Processing Delay
  setTimeout(() => {
    calculateResults();
    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";
    btn.disabled = false;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }, 1500);
});

function calculateResults() {
  // 1. Inputs
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const dobInput = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  
  if (!height || !weight || !dobInput) return;

  // 2. BMI Logic
  const bmi = weight / Math.pow(height / 100, 2);
  let bmiCategory = "", bmiScore = 0;

  if (bmi < 18.5) { bmiCategory = "Underweight"; bmiScore = 3; } 
  else if (bmi < 25) { bmiCategory = "Normal"; bmiScore = 5; } 
  else if (bmi < 30) { bmiCategory = "Overweight"; bmiScore = 3; } 
  else { bmiCategory = "Obese"; bmiScore = 1; }

  // 3. Base Score Calculation
  let total = bmiScore;
  const fields = ["food", "activity", "stress", "sleep", "screen", "fap", "mental", "smoking", "alcohol", "water", "illness"];
  
  fields.forEach(id => {
    total += parseInt(document.getElementById(id).value || 0);
  });

  // 4. Determine Quality & Base Age Range
  let quality = "", minAge = 0, maxAge = 0, tips = [];

  // Max score is approx 60 (11 fields * 5 + BMI)
  if (total >= 50) {
    quality = "🔥 Legendary";
    minAge = 85; maxAge = 100;
    tips.push("Your habits are elite. Keep it up.");
  } else if (total >= 40) {
    quality = "✅ Solid Human";
    minAge = 75; maxAge = 88;
    tips.push("Good foundation. Watch the stress.");
  } else if (total >= 28) {
    quality = "⚠️ Risky";
    minAge = 60; maxAge = 75;
    tips.push("You are cutting corners on your health.");
  } else {
    quality = "🚨 CRITICAL";
    minAge = 40; maxAge = 60;
    tips.push("Your lifestyle is actively killing you.");
  }

  // 5. PENALTIES & HARD CAPS (The "Severe" Logic)
  const illnessVal = parseInt(document.getElementById("illness").value);
  const waterVal = parseInt(document.getElementById("water").value);
  const sleepVal = parseInt(document.getElementById("sleep").value);

  // A. Illness Logic (The Hard Cap)
  if (illnessVal === 0) { // Severe
    maxAge = Math.min(maxAge, 55); 
    minAge = Math.min(minAge, 35);
    tips.push("⚠️ Critical Health Condition detected. Timeline strictly limited.");
  } else if (illnessVal === 2) { // Mild
    maxAge -= 8;
    minAge -= 5;
    tips.push("Managing your condition is key to extending this timeline.");
  }

  // B. Water Penalty
  if (waterVal === 1) {
    maxAge -= 5;
    tips.push("⚠️ Chronic Dehydration: Kidney failure risk increased.");
  }

  // C. Sleep Penalty (14hr+ check)
  // Note: Value '1' in sleep is used for both <4hrs and 14+hrs in HTML
  if (sleepVal === 1) {
    maxAge -= 6;
    tips.push("⚠️ Extreme sleep patterns (too low or too high) damage the heart.");
  }

  // D. Gender Logic
  if (gender === "female") {
    maxAge += 5;
    minAge += 3;
  }

  // 6. Death Date Calculation
  const dob = new Date(dobInput);
  const lifeSpan = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
  
  let deathDate = new Date(dob);
  deathDate.setFullYear(dob.getFullYear() + lifeSpan);
  deathDate.setDate(deathDate.getDate() + Math.floor(Math.random() * 365));

  const deathString = deathDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  const today = new Date();
  
  let footerMsg = (deathDate < today) 
    ? "💀 SYSTEM ERROR: You are statistically dead. Living on bonus time."
    : `🪦 Estimated Checkout: ${deathString} (Age: ${lifeSpan})`;

  // 7. Render
  document.getElementById("result").innerHTML = `
    <h2>📊 Fate Analysis</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
        <div><b>Score:</b> ${total}</div>
        <div><b>Rank:</b> ${quality}</div>
        <div><b>BMI:</b> ${bmi.toFixed(1)} (${bmiCategory})</div>
        <div><b>Water:</b> ${document.getElementById("water").options[document.getElementById("water").selectedIndex].text}</div>
    </div>
    
    <div style="background: rgba(255, 0, 0, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ff4d4d;">
      <b>💡 Critical Insights:</b>
      <ul style="margin: 5px 0 0 15px; padding: 0; font-size: 0.9em; color: #ddd;">
        ${tips.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-top: 20px; text-align: center; color: #ff4d4d; font-weight: bold; font-size: 1.2em; padding-top: 15px; border-top: 1px solid #444;">
      ${footerMsg}
    </div>
  `;
}
