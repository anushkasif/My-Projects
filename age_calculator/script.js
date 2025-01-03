const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

function calculateAge() {
  const birthdayValue = birthdayEl.value;
  if (birthdayValue === "") {
    alert("Please enter your birthday");
  } else {
    const age = getAge(birthdayValue);
    resultEl.innerHTML = 
      `You are <br><span class="years">${age.years} ${age.years > 1 ? "years" : "year"}</span><br>` +
      `<span class="months">${age.months} ${age.months > 1 ? "months" : "month"}</span><br>` +
      `<span class="days">${age.days} ${age.days > 1 ? "days" : "day"}</span> old.`;
  }
}

function getAge(birthdayValue) {
  const currentDate = new Date();
  const birthdayDate = new Date(birthdayValue);

  let years = currentDate.getFullYear() - birthdayDate.getFullYear();
  let months = currentDate.getMonth() - birthdayDate.getMonth();
  let days = currentDate.getDate() - birthdayDate.getDate();

  // If months or days are negative, adjust the values
  if (months < 0) {
    months += 12;
    years--;
  }
  
  if (days < 0) {
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }

  // If months are negative, adjust years as well
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days };
}

btnEl.addEventListener("click", calculateAge);
