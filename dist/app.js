console.log('test');
const receptoName = document.getElementById('pavadinimas');
const receptoDur = document.getElementById('gTrukme');
const receptoDesc = document.getElementById('aprasymas');
const submitBtn = document.getElementById('submitBtn');
const recipeEditor = document.getElementById('recipeEditor');
const recipeData = [];
submitBtn.onclick = () => {
    if (receptoName.value === '' || receptoName.value === '' || receptoDesc.value === '') {
        alert('Klaida: Neužpildyti visi laukeliai');
        return;
    }
    const recipe = {
        recipeName: receptoName.value,
        recipeDuration: receptoDur.value,
        recipeDescription: receptoDesc.value
    };
    fetch('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        console.log('receptas pridetas I DB');
        console.log(data);
    });
    const newRecipeDiv = document.createElement('div');
    newRecipeDiv.classList.add('recipe-info-con');
    newRecipeDiv.setAttribute('contentEditable', 'true');
    newRecipeDiv.id = 'recipeEditor';
    const newRecipeName = document.createElement('div');
    const newRecipeNameSpan = document.createElement('span');
    newRecipeName.classList.add('recipe-name');
    newRecipeNameSpan.innerHTML = recipe.recipeName;
    newRecipeName.appendChild(newRecipeNameSpan);
    const newRecipeDur = document.createElement('div');
    const newRecipeDurSpan = document.createElement('span');
    newRecipeDur.classList.add('recipe-duration');
    newRecipeDurSpan.innerHTML = recipe.recipeDuration;
    newRecipeDur.appendChild(newRecipeDurSpan);
    const newRecipeDesc = document.createElement('div');
    const newRecipePara = document.createElement('p');
    newRecipeDesc.classList.add('recipe-desc');
    newRecipePara.innerHTML = recipe.recipeDescription;
    newRecipeDesc.appendChild(newRecipePara);
    const newRecipeButtons = document.createElement('div');
    newRecipeButtons.classList.add('recipe-buttons');
    const newRecipeUpdateBtn = document.createElement('button');
    newRecipeUpdateBtn.innerHTML = 'Atnaujinti';
    const newRecipeDeleteBtn = document.createElement('button');
    newRecipeDeleteBtn.innerHTML = 'Ištrinti';
    newRecipeButtons.appendChild(newRecipeUpdateBtn);
    newRecipeButtons.appendChild(newRecipeDeleteBtn);
    newRecipeDiv.appendChild(newRecipeName);
    newRecipeDiv.appendChild(newRecipeDur);
    newRecipeDiv.appendChild(newRecipeDesc);
    newRecipeDiv.appendChild(newRecipeButtons);
    const receptoInfoCon = document.querySelector('.recipe-wrapper');
    receptoInfoCon.appendChild(newRecipeDiv);
};
// recipeEditor.onclick = () => {
//     if(recipeEditor.contentEditable === 'true') {
//         recipeEditor.contentEditable = 'false';
//     } else {
//          recipeEditor.contentEditable = 'true';
//          recipeEditor.focus();
//     }
// }
function clickEvent(event) {
    return recipeEditor.contains(event.target);
}
recipeEditor.addEventListener('click', () => {
    if (recipeEditor.contentEditable !== 'true') {
        recipeEditor.contentEditable = 'true';
        recipeEditor.focus();
    }
});
document.addEventListener('click', (event) => {
    if (!clickEvent(event)) {
        recipeEditor.contentEditable = 'false';
    }
});
export {};
