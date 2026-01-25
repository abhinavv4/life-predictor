document.getElementById("lifestyleForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let total = 0;
const fields = ["food","activity","stress","sleep","illness","habits","screen","fap"];
  fields.forEach(id => total += parseInt(document.getElementById(id).value));

  let quality = "", min = 0, max = 0, tips = "";

  if (total >= 32) {
    quality = "🔥 Excellent";
    min = 85; max = 95;
    tips = "Elite discipline. Maintain consistency.";
  } else if (total >= 25) {
    quality = "💪 Good";
    min = 75; max = 85;
    tips = "Improve sleep and training routine.";
  } else if (total >= 18) {
    quality = "⚠️ Average";
    min = 65; max = 75;
    tips = "Fix diet, stress, and sleep ASAP.";
  } else {
    quality = "🚨 Poor";
    min = 50; max = 65;
    tips = "You're self-destructing. Wake up.";
  }

  const dob = new Date(document.getElementById("dob").value);
 const randomLife = Math.floor(Math.random() * (max - min + 1)) + min;

let deathDate = new Date(dob);
deathDate.setFullYear(dob.getFullYear() + randomLife);

// Add random months and days for realism
deathDate.setMonth(Math.floor(Math.random() * 12));
deathDate.setDate(Math.floor(Math.random() * 28) + 1);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const deathMode = document.getElementById("deathMode").value;

 let deathTitle = "☠️ GOING TO…";
  let deathMessage = "";

  if (deathMode === "normal") {
    deathMessage = "💀 " + deathDate.toLocaleDateString('en-IN', options);
  } 
  else if (deathMode === "immortal") {
    deathTitle = "🧬 Immortality Status";
    deathMessage = "You are IMMORTAL. Death fears you.";
  } 
  else {
    const chaos = {
      croissant: "Choked by legendary croissant 🥐",
      walmart: "Suffocated by Walmart bag 🛍️",
      helicopter: "Taken away by military helicopter 🚁",
      mcqueen: "Run over by Lightning McQueen 🏎️",
      donut: "Sugar overdose from donuts 🍩",
      chicken: "Attacked by angry chickens 🍗",
      spotify: "Killed by emotional Spotify playlist 🎧",
      lightning: "Struck by anime-level lightning ⚡"
    };
    deathMessage = chaos[deathMode];
  }

  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerHTML = `
    <h2>🧠 Final Analysis</h2>
    <p><b>Lifestyle Score:</b> ${total} / 35</p>
    <p><b>Quality:</b> ${quality}</p>
    <p><b>Self-Control Level:</b> ${document.getElementById("fap").selectedOptions[0].text}</p>

    <p><b>Estimated Lifespan:</b> ${min} – ${max} years</p>
    <p><b>${deathTitle}:</b> ${deathMessage}</p>
    <p><b>Reality Check:</b> ${tips}</p>
  `;
});
