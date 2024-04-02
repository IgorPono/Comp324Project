document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        const jsonData = JSON.stringify(formObject);
        console.log(jsonData);

        //port matches the port where node server is hosted
        //submitFormData matches the post call by the same name in the node server
        fetch('http://localhost:3000/submitFormData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })

        event.target.reset();
    });
});