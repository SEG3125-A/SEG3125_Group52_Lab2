document.getElementById('customer-form').onsubmit = function(event) {
    event.preventDefault(); 

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var dietInput = document.getElementById('diet');

    var name = nameInput.value;
    var email = emailInput.value;
    var diet = dietInput.value;

    if (name.trim() === '' && email.trim() === '') {
        alert('Please fill out both name and email fields.');
        return;
    }

    if (name.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    if (email.trim() === '') {
        alert('Please enter your email.');
        return;
    }

    var preferences = {
        name: name,
        email: email,
        diet: diet
    };

    localStorage.setItem('dietPreference', preferences.diet);

    console.log('Customer preferences saved:', preferences);
    alert('Saved!'); 
};
