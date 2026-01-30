document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
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

  let total = bmiScore;
  const fields = ["food", "activity", "stress", "sleep", "illness", "screen", "fap", "mental", "smoking", "alcohol", "drugs", "water"];
  fields.forEach(id => total += parseInt(document.getElementById(id).value));

  const mentalValue = parseInt(document.getElementById("mental").value);
  let mentalTips = "";

  switch (mentalValue) {
    case 5:
      mentalTips = "Your mental health is in excellent shape! To maintain it, continue engaging in activities that bring you joy, practice gratitude daily, maintain strong social connections, and incorporate mindfulness or meditation into your routine. Regular physical activity and a balanced diet also support long-term mental well-being.";
      break;
    case 4:
      mentalTips = "Occasional blues are normal and often temporary. To manage them, try journaling your thoughts, practicing deep breathing exercises or progressive muscle relaxation, spending time in nature, or talking to a trusted friend or family member. If these feelings become more frequent, consider tracking patterns and seeking early support to prevent escalation.";
      break;
    case 3:
      mentalTips = "Manageable anxiety or depression can be addressed with lifestyle changes. Incorporate daily practices like meditation (try apps like Headspace or Calm), regular exercise such as walking or yoga, maintaining a consistent sleep schedule, and eating nutrient-rich foods. Building a support network and setting small, achievable goals can help. If symptoms persist, consult a mental health professional for personalized strategies.";
      break;
    case 2:
      mentalTips = "Frequent mental health issues signal the need for proactive intervention. Prioritize self-care by limiting stressors, practicing cognitive behavioral techniques (like challenging negative thoughts), and engaging in hobbies. It's important to seek professional help—consider therapy or counseling. In India, you can reach out to Tele-MANAS at 14416 or 1-800-891-4416 for 24/7 free support, or KIRAN at 1800-599-0019 for mental health rehabilitation.";
      break;
    case 1:
      mentalTips = "Severe mental health concerns require immediate professional attention. You're not alone, and help is available. Please reach out to a trusted person or a helpline right away. In India, contact Tele-MANAS (14416 or 1-800-891-4416) for 24/7 support, KIRAN (1800-599-0019) for crisis intervention, Vandrevala Foundation (+91 9999 666 555) for confidential counseling, or Jeevan Aastha Helpline (1800 233 3330) for suicide prevention. Consider visiting a local mental health clinic or hospital if possible. Taking this step is a sign of strength.";
      break;
  }

  let quality = "", min = 0, max = 0, tips = "";

  if (total >= 55) {
    quality = "🔥 Excellent";
    min = 85; max = 95;
    tips = "Elite discipline. Maintain consistency. Keep nurturing your mental health with positive habits.";
  } else if (total >= 45) {
    quality = "💪 Good";
    min = 75; max = 85;
    tips = "Improve sleep and training routine. Consider mindfulness for better mental health.";
  } else if (total >= 30) {
    quality = "⚠️ Average";
    min = 65; max = 75;
    tips = "Fix diet, stress, and sleep ASAP. Seek support if mental health is slipping.";
  } else {
    quality = "🚨 Poor";
    min = 50; max = 65;
    tips = "You're self-destructing. Wake up. Prioritize mental health interventions.";
  }

  const dob = new Date(document.getElementById("dob").value);
  const randomLife = Math.floor(Math.random() * (max - min + 1)) + min;

  let deathDate = new Date(dob);
  deathDate.setFullYear(dob.getFullYear() + randomLife);

  // Add random days between 0 and 364 for realism (up to almost a full year)
  const randomDays = Math.floor(Math.random() * 365);
  deathDate.setDate(deathDate.getDate() + randomDays);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  let deathTitle = "☠️ GOING TO…";
  let deathMessage = "💀 " + deathDate.toLocaleDateString('en-IN', options);

  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerHTML = `
    <h2>🧠 Final Analysis</h2>
    <p><b>Lifestyle Score:</b> ${total} / 60</p>
    <p><b>Quality:</b> ${quality}</p>
    <p><b>BMI:</b> \( {bmi.toFixed(2)} ( \){bmiCategory})</p>
    <p><b>Self-Control Level:</b> ${document.getElementById("fap").selectedOptions[0].text}</p>
    <p><b>Mental Health Level:</b> ${document.getElementById("mental").selectedOptions[0].text}</p>
    <p><b>Estimated Lifespan:</b> ${min} – ${max} years</p>
    <p><b>${deathTitle}:</b> ${deathMessage}</p>
    <p><b>Reality Check:</b> ${tips}</p>
    <p><b>Detailed Mental Health Tips:</b> ${mentalTips}</p>
  `;
});