document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // --- BMI CALCULATION ---
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  
  if (!height || !weight) {
    alert("Please enter valid height and weight!");
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  let bmiCategory = "";
  let bmiScore = 0;

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiScore = 3;
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = "Normal";
    bmiScore = 5;
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight";
    bmiScore = 3;
  } else if (bmi >= 30 && bmi < 35) {
    bmiCategory = "Obese";
    bmiScore = 2;
  } else {
    bmiCategory = "Severely Obese";
    bmiScore = 1;
  }

  // --- TOTAL SCORE CALCULATION ---
  let total = bmiScore;
  const fields = ["food", "activity", "stress", "sleep", "illness", "screen", "fap", "mental", "smoking", "alcohol", "drugs", "water"];
  
  fields.forEach(id => {
    const el = document.getElementById(id);
    if(el) total += parseInt(el.value);
  });

  // --- SHORT & SIMPLE MENTAL ADVICE ---
  const mentalValue = parseInt(document.getElementById("mental").value);
  let mentalTips = "";

  switch (mentalValue) {
    case 5: mentalTips = "Keep doing what you love!"; break;
    case 4: mentalTips = "Stay connected with friends."; break;
    case 3: mentalTips = "Try meditation and better sleep."; break;
    case 2: mentalTips = "Talk to a therapist, it helps."; break;
    case 1: mentalTips = "You are not alone. Please seek help."; break;
  }

  // --- SHORT & SIMPLE GENERAL ADVICE ---
  let quality = "", min = 0, max = 0, generalTips = "";

  if (total >= 55) {
    quality = "🔥 Excellent";
    min = 85; max = 95;
    generalTips = "You're a legend! Keep crushing it.";
  } else if (total >= 45) {
    quality = "💪 Good";
    min = 75; max = 85;
    generalTips = "Solid habits. Tweak diet/sleep to level up.";
  } else if (total >= 30) {
    quality = "⚠️ Average";
    min = 65; max = 75;
    generalTips = "Okay, but cut the bad habits and move more.";
  } else {
    quality = "🚨 Poor";
    min = 50; max = 65;
    generalTips = "Time to reset. Drink water, walk daily, cut junk.";
  }

  // Combine for final short advice
  const combinedAdvice = `${generalTips} Mental note: ${mentalTips}`;

  // --- DEATH DATE CALCULATION ---
  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    alert("Please enter your Date of Birth!");
    return;
  }
  const dob = new Date(dobInput);
  const randomLife = Math.floor(Math.random() * (max - min + 1)) + min;
  
  let deathDate = new Date(dob);
  deathDate.setFullYear(dob.getFullYear() + randomLife);
  
  // Randomize the exact day
  const randomDays = Math.floor(Math.random() * 365);
  deathDate.setDate(deathDate.getDate() + randomDays);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let deathTitle = "☠️ GOING TO…";
  let deathMessage = "💀 " + deathDate.toLocaleDateString('en-IN', options);

  // --- RENDER RESULT ---
  // FIX: Used backticks `${}` correctly for BMI
  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerHTML = `
    <h2>🧠 Final Analysis</h2>
    <p><b>Lifestyle Score:</b> ${total} / 65</p>
    <p><b>Quality:</b> ${quality}</p>
    <p><b>BMI:</b> ${bmi.toFixed(2)} (${bmiCategory})</p>
    <p><b>Self-Control:</b> ${document.getElementById("fap").selectedOptions[0].text}</p>
    <p><b>Mental State:</b> ${document.getElementById("mental").selectedOptions[0].text}</p>
    <p><b>Est. Lifespan:</b> ${min} – ${max} years</p>
    <p><b>${deathTitle}:</b> ${deathMessage}</p>
    <p style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.3); border-radius:5px;">
      <b>💡 Advice:</b> ${combinedAdvice}
    </p>
  `;
});
