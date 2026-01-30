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
      mentalTips = "Your mind is in great shape! Keep it up by doing things you love, staying thankful, hanging out with friends, and trying a bit of meditation. Exercise and good food help too.";
      break;
    case 4:
      mentalTips = "Everyone gets down sometimes—it's normal. Write down your thoughts, take deep breaths, go for a walk outside, or chat with a buddy. If it happens more, keep an eye on it and get help early if needed.";
      break;
    case 3:
      mentalTips = "You can handle this anxiety or low mood with some changes. Try meditating (apps like Headspace are easy), walking or yoga daily, sticking to a sleep routine, and eating well. Talk to friends and set small goals. If it sticks around, see a pro for tips.";
      break;
    case 2:
      mentalTips = "If issues pop up a lot, it's time to take action. Cut down on stress, challenge bad thoughts, and do fun stuff. Get help from a therapist—it's a smart move. In India, call Tele-MANAS at 14416 or 1-800-891-4416 anytime, or KIRAN at 1800-599-0019 for support.";
      break;
    case 1:
      mentalTips = "This is tough, but help is out there—you're not alone. Talk to someone you trust or call a helpline now. In India, try Tele-MANAS (14416 or 1-800-891-4416) for round-the-clock chat, KIRAN (1800-599-0019) for emergencies, Vandrevala Foundation (+91 9999 666 555) for private talks, or Jeevan Aastha (1800 233 3330) to prevent bad thoughts. Seeing a doctor nearby is a strong step.";
      break;
  }

  let quality = "", min = 0, max = 0, generalTips = "";

  if (total >= 55) {
    quality = "🔥 Excellent";
    min = 85; max = 95;
    generalTips = "You're killing it with great habits all around—food, activity, low stress, solid sleep, and more. Keep this up for a long, happy life. Maybe add some new challenges like trying a new sport or hobby to stay fresh.";
  } else if (total >= 45) {
    quality = "💪 Good";
    min = 75; max = 85;
    generalTips = "Solid base, but room to level up. Focus on better sleep, more consistent workouts, healthier eats, cutting screen time, and managing stress or habits like smoking/drinking. Small changes add up big time.";
  } else if (total >= 30) {
    quality = "⚠️ Average";
    min = 65; max = 75;
    generalTips = "Things are okay, but let's improve. Prioritize fixing your diet, getting more active, reducing stress and screen time, improving sleep, and cutting back on any bad habits. Track your water and self-control too—start with one thing at a time.";
  } else {
    quality = "🚨 Poor";
    min = 50; max = 65;
    generalTips = "Time for a reset—your habits in food, activity, stress, sleep, screen time, and more need work to avoid issues. Start small: drink more water, walk daily, cut junk, and seek support for mental stuff or addictions. You've got this, one step at a time.";
  }

  // Combine tips into one conclusion
  const combinedAdvice = `${generalTips} On the mental side: ${mentalTips} Overall, aim for balance across all areas—your body and mind will thank you. Remember, progress over perfection!`;

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
    <p><b>self-Control Level:</b> ${document.getElementById("fap").selectedOptions[0].text}</p>
    <p><b>Mental Health Level:</b> ${document.getElementById("mental").selectedOptions[0].text}</p>
    <p><b>Estimated Lifespan:</b> ${min} – ${max} years</p>
    <p><b>${deathTitle}:</b> ${deathMessage}</p>
    <p><b>Conclusion & Friendly Advice:</b> ${combinedAdvice}</p>
  `;
});