function uploadAndIdentifyPlantID (){
    //Get the photo from the front end.
    const photoInput = document.getElementById("photoInput");

    //If no photo was selected and the user clicks on "Submit",
    //Alert the user to upload a photo.
    if(photoInput.files.length === 0){
        alert("Please select a photo to upload.");
        return;
    }

    //Select the first file from the file arrays of an input element.
    const selectedFile = photoInput.files[0];

    //Create a new file reader object so we can read file contents.
    const reader = new FileReader();

    //Trigger the onload event when the reading operation of a file is complete.
    reader.onload = function (e){
        //Store the base64Image on a variable.
        const base64Image = e.target.result;
        console.log('base64Image', base64Image);
        //Store the variables for the API call.
        const apiKey = 'nbvq0gJUFaBSR8wGMO95CdjmVJP00mtzhpcVw04SFGLonnPPpg'
        const latitude = 49.207;
        const longitude = 16.608;
        const health = 'all';
        const similarImages = true;
        const details = 'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods,treatment,cause';
        const language = 'en'
        const apiUrlPlantID = `https://plant.id/api/v3/identification?details=${details}&language=${language}`;

        //Make first API CALL with our base64Image.
        axios.post (apiUrlPlantID, {
            "images": [base64Image],
            "latitude": latitude,
            "longitude": longitude,
            "health": health,
            "similar_images": similarImages,
        }, {
            headers: {
                "Api-Key": apiKey,
                "Content-Type": "application/json",
            }
        })

        //This is the pending state of the promise.
        .then(function (response) {
            console.log('Response from Plant ID API:', response.data);
            displayPlantIDInfo(response.data, base64Image);
        })

        //This is the error state of the promise.
        .catch(function (error) {
            alert(`Error: ${error} XXX`)
            console.error('Error:', error);
        });
    };

    //Read the selected file as a data URL - a base64 encoded representation...
    //Of the file's content.
    reader.readAsDataURL(selectedFile);
}

//Display fucntion for the plant ID info.
function displayPlantIDInfo(plantIdResponse, base64Image){
    
    //Variable to store the first suggestion.
    const plantIdClassification = plantIdResponse.result.classification;
    const plantIdDisease = plantIdResponse.result.disease;
    const plantIdIsHealthy = plantIdResponse.result.is_healthy;
    const plantIdIsPlant = plantIdResponse.result.is_plant;
    
    //Plan preview image.
    //Grab previewImage element from front end plantidentifier.html file.
    const previewImage = document.getElementById('previewImage');
    previewImage.src = base64Image;

    //Plant name.
    //Grab html for the plant title container.
    const plantNameContainer = document.getElementById('plant-name-container');
    //Create new <p> tag for plant title.
    const plantNameElement = document.createElement('p');
    //Add name of the plant to innerHTML of new <p> tag.
    plantNameElement.innerHTML = `<strong>Name:</strong> ${plantIdClassification.suggestions[0].name}`;
    //Append the new div to the API result container grabbed fromt the HTML.
    plantNameContainer.appendChild(plantNameElement);

    //Similar image.
    //Grab the similar image from the API response. *Typo below is intentional.*
    const plantSimiliarImage = plantIdClassification.suggestions[0].similar_images[0].url;
    //Grab the HTML where the image will be placed.
    const similiarImageHTML = document.getElementById('plant-similiar-image');
    //Set image HTML src attribute to image.
    similiarImageHTML.src = plantSimiliarImage;

    //Probability.
    //Grab the score from the API response.
    const probabilityOfPlant = plantIdClassification.suggestions[0].probability;
    //Grab HTML where the probability will be placed.
    const probabilityNameContainer = document.getElementById('probability-container');
    //Create a new <p> tag for the probability text.
    const probabilityNameElement = document.createElement('p');
    //Add probability text to the innerHTML of new <p> tag.
    probabilityNameElement.innerHTML = `<strong>Probability:</strong> ${probabilityOfPlant}`;
    //Append the new div created.
    probabilityNameContainer.appendChild(probabilityNameElement);

    //Is Plant.
    //Grab Is Plant boolean value form API response.
    const isPlant = plantIdIsPlant.binary;
    //Grab HTML where the boolean will be placed.
    const isPlantContainer = document.getElementById('isPlant-container');
    //Create new <p> tag for Is Plant boolean.
    const isPlantElement = document.createElement('p');
    //Check if submitted photo is a plant; if not, alert user.
    if (isPlant === false) {
        alert('The photo you submitted is not a plant. Please try again!');
        window.location.reload();
    }
    //Add boolean to innerHTML of new <p> tag created.
    isPlantElement.innerHTML = `<strong>Is  Plant:</strong> ${isPlant}`;
    //Append the new div created.
    isPlantContainer.appendChild(isPlantElement);

    //Common Name.
    //Grab first common name from API response.
    const commonName = plantIdClassification.suggestions[0].details.common_names[0];
    //Grab HTML where the common name will be placed.
    const commonNameContainer = document.getElementById('common-name-container');
    //Create new <p> tag element.
    const commonNameElement = document.createElement('p');
    //Add Common Name to innerHTML of new <p> tag created.
    commonNameElement.innerHTML = `<strong>CommonName:</strong> ${commonName}`;
    //Append the new div created.
    commonNameContainer.appendChild(commonNameElement);

    //Description.
    //Grab value from API response.
    const plantDescription = plantIdClassification.suggestions[0].details.description.value;
    //Grab container from the front end HTML.
    const descriptionContainer = document.getElementById('description-container');
    //Create new <p> tag element.
    const descriptionElement = document.createElement('p');
    //Add text to innerHTML of new <p> tag created.
    descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
    //Append the new div created.
    descriptionContainer.appendChild(descriptionElement);

    //Plant Health Status.
    //Grab value from API response.
    const plantHealthStatus = plantIdIsHealthy.binary;
    //Grab container from the front end HTML.
    const plantHealthStatusContainer = document.getElementById('plant-health-status-container');
    //Create new <p> tag element.
    const plantHealthStatusElement = document.createElement('p');
    //Add text to innerHTML of new <p> tag created.
    plantHealthStatusElement.innerHTML = `<strong>Health Status:</strong> ${plantHealthStatus}`;
    //Append the new div created.
    plantHealthStatusContainer.appendChild(plantHealthStatusElement);

    //Similar Image With Disease.
    //Grab similar image from API response.
    const plantSimiliarImageWithDisease = plantIdDisease.suggestions[0].similar_images[0].url;
    //Grab container from the front end HTML.
    const similiarImageWithDiseaseHTML = document.getElementById('plant-similiar-image-with-disease');
    //Set image HTML src attribute to image.
    similiarImageWithDiseaseHTML.src = plantSimiliarImageWithDisease;

    //Disease Name.
    //Grab value from API response.
    const plantDiseaseName = plantIdDisease.suggestions[0].name;
    //Grab container from the front end HTML.
    const plantDiseaseNameContainer = document.getElementById('plant-disease-name-container');
    //Create new <p> tag element.
    const plantDiseaseNameElement = document.createElement('p');
    //Add text to innerHTML of new <p> tag created.
    plantDiseaseNameElement.innerHTML = `<strong>Disease:</strong> ${plantDiseaseName}`;
    //Append the new div created.
    plantDiseaseNameContainer.appendChild(plantDiseaseNameElement);

    //Disease Probability.
    //Grab value from API response.
    const plantDiseaseProbability = plantIdDisease.suggestions[0].probability;
    //Grab container from the front end HTML.
    const plantDiseaseProbabilityContainer = document.getElementById('plant-disease-probability');
    //Create new <p> tag element.
    const plantDiseaseProbabilityElement = document.createElement('p');
    //Add text to innerHTML of new <p> tag created.
    plantDiseaseProbabilityElement.innerHTML = `<strong>Disease Probability:</strong> ${plantDiseaseProbability}`;
    //Append the new div created.
    plantDiseaseProbabilityContainer.appendChild(plantDiseaseProbabilityElement);

    //Disease Description.
    //Grab value from API response.
    const plantDiseaseDescription = plantIdDisease.suggestions[0].details.description;
    //Grab container from the front end HTML.
    const plantDiseaseDescriptionContainer = document.getElementById('plant-disease-description');
    //Create new <p> tag element.
    const plantDiseaseDescriptionElement = document.createElement('p');
    //Add text to innerHTML of new <p> tag created.
    plantDiseaseDescriptionElement.innerHTML = `<strong>Disease Description:</strong> ${plantDiseaseDescription}`;
    //Append the new div created.
    plantDiseaseDescriptionContainer.appendChild(plantDiseaseDescriptionElement);

    //Disease Treatment.
    //Grab value from API response.
    const plantDiseaseTreament = plantIdDisease.suggestion[0].details.treatment;
    //Grab container from the front end HTML.
    const plantDiseaseTreamentContainer = document.getElementById('plant-disease-treatment');
    //Create new <p> tag element.
    const plantDiseaseTreatmentElement = document.createElement('p');
    //Check if the plant is dead or if object is empty.
    //Notify user there is no treatment available for dead plants.
    if(Object.keys(plantDiseaseTreatment).length === 0){
        //Add text to the innerHTML of new <p> tag created.
        plantDiseaseTreatmentElement.innerHTML = `<strong>Disease Treatment:</strong>No treatment available.`;
        plantDiseaseTreamentContainer.appendChild(plantDiseaseTreamentElement);
    }

    //For loop through the object and map the keys to values, then attach them to HTML container.
    for(const key in plantDiseaseTreatment){
        //If the object has a key value pair.
        if(plantDiseaseTreatment.hasOwnProperty(key)){
            //Create a variable that matchesthe key with the values and wrap them in HTML.
            const plantDiseaseTreamentValues = plantDiseaseTreament[key].map(value => `<li>${value}</li>`).join('');
            const plantDiseaseTreamentText = `<strong>Disease Treatment ${key}:</strong> <ul>${plantDiseaseTreamentValues}</ul>`;
            //Append test of the key value pairs into the HTML container.
            plantDiseaseTreamentContainer.innerHTML += plantDiseaseTreamentText;
        }
    }
}