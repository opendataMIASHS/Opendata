// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}





const form = document.querySelector("#commune");

const ERREUR_COMMUNE = "Essaye Rousset, la ville natale de Robinou ;)";

form.addEventListener("submit", function (event) {
	alert("ici");
	// stop form submission
	event.preventDefault();

	// validate the form
let communeValide = hasValue(form.elements["nomCommune"], ERREUR_COMMUNE);
	// if valid, submit the form.
	if (communeValide) {
		alert("YESSSSSSSSSSSSSS");
	}
});
