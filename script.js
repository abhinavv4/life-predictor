document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // 1. Hide previous results & show loading
  const resultDiv = document.getElementById("result");
  const loadingDiv = document.getElementById("loading");
  const btn = document.getElementById("analyzeBtn");
  
  resultDiv.style.display = "none";
  loadingDiv.style.display = "block";
  btn.disabled = true;

  // Fake processing delay (1.5 seconds)
  setTimeout(() => {
    calculateResults();
    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";
    btn.disabled = false;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }, 1500);
});

function calculateResults() {
  // --- 1. GET INPUTS ---
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const dobInput = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;

  if (!height || !weight || !dobInput) return; // Should be caught by HTML 'required'

  // --- 2. BMI CALCULATION ---
  const bmi = weight / Math.pow(height / 100, 2);
  let bmiCategory = "", bmiScore = 0, bmiAdvice = "";

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiScore = 3;
    bmiAdvice = "You need mass! Focus on calorie surplus and strength training.";
  } else if (bmi < 25) {
    bmiCategory = "Normal";
    bmiScore = 5;
    bmiAdvice = "Perfect weight. Maintain this ratio.";
  } else if (bmi < 30) {
    bmiCategory = "Overweight";
    bmiScore = 3;
    bmiAdvice = "Cut the sugar. Increase cardio intensity.";
  } else {
    bmiCategory = "Obese";
    bmiScore = 1;
    bmiAdvice = "Critical: Immediate lifestyle intervention needed.";
  }

  // --- 3. TOTAL SCORE ---
  let total = bmiScore;
  // Fields to sum up
  const fields = ["food", "activity", "stress", "sleep", "screen", "fap", "mental", "smoking", "alcohol"];
  
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) total += parseInt(el.value, 10);
  });
  
  // Normalize Max Score (Roughly 9 fields * 5 + BMI 5 = 50)
  // Adjusted thresholds based on 50 max
  
  // --- 4. PREDICTION LOGIC ---
  let quality = "", minAge = 0, maxAge = 0, generalTips = "";
  
  if (total >= 42) {
    quality = "🔥 Legendary (GigaChad)";
    minAge = 85; maxAge = 100;
    generalTips = "You are operating at peak efficiency.";
  } else if (total >= 32) {
    quality = "✅ Solid Human";
    minAge = 75; maxAge = 88;
    generalTips = "Good foundation, but don't get complacent.";
  } else if (total >= 22) {
    quality = "⚠️ NPC Status";
    minAge = 60; maxAge = 75;
    generalTips = "You are surviving, not thriving. Fix your habits.";
  } else {
    quality = "🚨 TERMINAL VELOCITY";
    minAge = 40; maxAge = 60;
    generalTips = "Your lifestyle is actively trying to kill you.";
  }

  // --- 5. GENDER MODIFIER ---
  // Statistically, females live longer.
  if (gender === "female") {
    maxAge += 4;
    minAge += 2;
  }

  // --- 6. DATE OF DEATH CALCULATION ---
  const dob = new Date(dobInput);
  const randomLifeSpan = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
  
  let deathDate = new Date(dob);
  deathDate.setFullYear(dob.getFullYear() + randomLifeSpan);
  
  // Add some randomness to the day/month
  deathDate.setDate(deathDate.getDate() + Math.floor(Math.random() * 365));

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const deathString = deathDate.toLocaleDateString('en-IN', options);
  
  // Check if they are already "dead" based on logic
  const today = new Date();
  let footerMsg = (deathDate < today) 
    ? "💀 ERROR: You should be dead already. Living on borrowed time."
    : `🪦 Estimated Checkout: ${deathString} (Age: ${randomLifeSpan})`;

  // --- 7. RENDER ---
  const mentalText = document.getElementById("mental").options[document.getElementById("mental").selectedIndex].text;
  
  document.getElementById("result").innerHTML = `
    <h2>📊 Final Analysis</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
        <div><b>Score:</b> ${total} / 50</div>
        <div><b>Rank:</b> ${quality}</div>
        <div><b>BMI:</b> ${bmi.toFixed(1)} (${bmiCategory})</div>
        <div><b>Mind:</b> ${mentalText}</div>
    </div>
    
    <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;">
      <b>💡 Advice:</b>
      <ul style="margin: 5px 0 0 15px; padding: 0; font-size: 0.95em; color: #ccc;">
        <li>${bmiAdvice}</li>
        <li>${generalTips}</li>
      </ul>
    </div>

    <div style="margin-top: 20px; text-align: center; color: #ff4d4d; font-weight: bold; font-size: 1.1em; border-top: 1px solid #444; padding-top: 15px;">
      ${footerMsg}
    </div>
  `;
}
