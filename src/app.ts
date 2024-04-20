import { Recipes } from "./recipes.js";

console.log('test');

const receptoName = <HTMLInputElement> document.getElementById('pavadinimas');
const receptoDur = <HTMLInputElement> document.getElementById('gTrukme');
const receptoDesc = <HTMLInputElement> document.getElementById('aprasymas');
const submitBtn = <HTMLButtonElement> document.getElementById('submitBtn');

const recipeEditor = <HTMLElement> document.getElementById('recipeEditor');

const showAllRecipesBtn = <HTMLButtonElement> document.getElementById('showAllRecipes');


const updateBtn = <HTMLButtonElement> document.getElementById('updateBtn');
const deleteBtn = <HTMLButtonElement> document.getElementById('deleteBtn');


const recipeData:Recipes[] = [];

submitBtn.onclick = () => {
    if(receptoName.value === '' || receptoName.value === '' || receptoDesc.value === '') {
        alert('Klaida: Neužpildyti visi laukeliai');
        return;
    }
    const recipe:Recipes = {
        recipeName:receptoName.value,
        recipeDuration:receptoDur.value,
        recipeDescription:receptoDesc.value
    }
    fetch('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
        method:'POST',
         headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(recipe)
    })
    .then((res) => {
        return res.json();
    })
    .then((data)=>{
        console.log('receptas pridetas I DB');
        console.log(data);
    })

        
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
        newRecipeUpdateBtn.id = 'updateBtn';
        const newRecipeDeleteBtn = document.createElement('button');
        newRecipeDeleteBtn.innerHTML = 'Ištrinti';
        newRecipeDeleteBtn.id = 'deleteBtn';
        newRecipeButtons.appendChild(newRecipeUpdateBtn);
        newRecipeButtons.appendChild(newRecipeDeleteBtn);

        newRecipeDiv.appendChild(newRecipeName);
        newRecipeDiv.appendChild(newRecipeDur);
        newRecipeDiv.appendChild(newRecipeDesc);

        const receptoInfoCon = <HTMLElement> document.querySelector('.recipe-wrapper');
        receptoInfoCon.appendChild(newRecipeDiv);
        receptoInfoCon.appendChild(newRecipeButtons);

}


const loadData = () => {
        fetch('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then((res) => {
        return res.json();
    })
    .then((data: { [key: string]: Recipes}) => {
        const receptoInfoCon = <HTMLElement> document.querySelector('.recipe-wrapper');
        receptoInfoCon.innerHTML = '';

        Object.keys(data).forEach((key)=> {
            const recipe = data[key];

            const newRecipeDiv = document.createElement('div');
            newRecipeDiv.classList.add('recipe-info-con');
            newRecipeDiv.setAttribute('contentEditable', 'true');

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

            receptoInfoCon.appendChild(newRecipeDiv);
            receptoInfoCon.appendChild(newRecipeButtons);

            newRecipeDeleteBtn.addEventListener('click', () => {
                deleteData(key); 
            });
            newRecipeUpdateBtn.addEventListener('click', () => {
                const updatedRecipe: Recipes = {
                    recipeName: newRecipeNameSpan.innerHTML,
                    recipeDuration: newRecipeDurSpan.innerHTML,
                    recipeDescription: newRecipePara.innerHTML
                };
                updateData(key, updatedRecipe);
            })

        })
    })
}

showAllRecipesBtn.onclick = loadData



function deleteData(key: string) {
    fetch(`https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes/${key}.json`, {
        method: 'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then((data) => {
        loadData();
        console.log('Receptas ištrintas')
    })
}

function updateData(key:string, update:Recipes) {
      fetch(`https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes/${key}.json`, {
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(update)
    })
    .then((data) => {
        loadData();
        console.log('Receptas atnaujintas');
    })
}


// recipeEditor.onclick = () => {
//     if(recipeEditor.contentEditable === 'true') {
//         recipeEditor.contentEditable = 'false';
//     } else {
//          recipeEditor.contentEditable = 'true';
//          recipeEditor.focus();
//     }
// }

function clickEvent(event: MouseEvent) {
    return recipeEditor.contains(event.target as Node);
}

recipeEditor.addEventListener('click', () => {
    if(recipeEditor.contentEditable !== 'true') {
        recipeEditor.contentEditable = 'true';
        recipeEditor.focus();
    }
})
document.addEventListener('click', (event: MouseEvent) => {
    if(!clickEvent(event)) {
        recipeEditor.contentEditable = 'false';
    }
})


