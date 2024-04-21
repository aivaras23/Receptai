export const userInfo = {
    email: '',
    idToken: '',
    loggedIn: false,
};
console.log('test');
const receptoName = document.getElementById('pavadinimas');
const receptoDur = document.getElementById('gTrukme');
const receptoDesc = document.getElementById('aprasymas');
const submitBtn = document.getElementById('submitBtn');
const recipeEditor = document.getElementById('recipeEditor');
const showAllRecipesBtn = document.getElementById('showAllRecipes');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const userData = [];
registerBtn.onclick = () => {
    if (loginEmail.value === '' || loginPassword.value === '') {
        alert('Klaida: Neužpildyti visi laukeliai');
        return;
    }
    else {
        const user = {
            email: loginEmail.value,
            password: loginPassword.value
        };
        fetch('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/registrations.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
            return res.json();
        })
            .then((data) => {
            console.log('naujas vartotojas pridėtas į DB');
            console.log(data);
        });
        const getLoginCon = document.getElementById('loginContainer');
        const getMainCon = document.getElementById('mainContainer');
        getLoginCon.style.display = 'none';
        getMainCon.style.display = 'grid';
    }
};
loginBtn.onclick = () => {
    fetch('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/registrations.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        const users = Object.values(data);
        const userFound = users.find(user => user.email === loginEmail.value && user.password === loginPassword.value);
        if (userFound) {
            const getLoginCon = document.getElementById('loginContainer');
            const getMainCon = document.getElementById('mainContainer');
            console.log('Sėkmingai prisijungta');
            getLoginCon.style.display = 'none';
            getMainCon.style.display = 'grid';
        }
        else {
            console.log('Neteisingas el paštas arba slaptažodis');
        }
    });
};
//const updateBtn = <HTMLButtonElement> document.getElementById('updateBtn');
// const deleteBtn = <HTMLButtonElement> document.getElementById('deleteBtn');
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
    newRecipeUpdateBtn.id = 'updateBtn';
    const newRecipeDeleteBtn = document.createElement('button');
    newRecipeDeleteBtn.innerHTML = 'Ištrinti';
    newRecipeDeleteBtn.id = 'deleteBtn';
    newRecipeButtons.appendChild(newRecipeUpdateBtn);
    newRecipeButtons.appendChild(newRecipeDeleteBtn);
    newRecipeDiv.appendChild(newRecipeName);
    newRecipeDiv.appendChild(newRecipeDur);
    newRecipeDiv.appendChild(newRecipeDesc);
    newRecipeDiv.appendChild(newRecipeButtons);
    const receptoInfoCon = document.querySelector('.recipe-wrapper');
    receptoInfoCon.appendChild(newRecipeDiv);
    // receptoInfoCon.appendChild(newRecipeButtons);
    receptoName.value = '';
    receptoDur.value = '';
    receptoDesc.value = '';
};
const loadData = () => {
    fetch('https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        const receptoInfoCon = document.querySelector('.recipe-wrapper');
        receptoInfoCon.innerHTML = '';
        Object.keys(data).forEach((key) => {
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
            newRecipeUpdateBtn.setAttribute('contentEditable', 'false');
            const newRecipeDeleteBtn = document.createElement('button');
            newRecipeDeleteBtn.innerHTML = 'Ištrinti';
            newRecipeDeleteBtn.setAttribute('contentEditable', 'false');
            newRecipeButtons.appendChild(newRecipeUpdateBtn);
            newRecipeButtons.appendChild(newRecipeDeleteBtn);
            newRecipeDiv.appendChild(newRecipeName);
            newRecipeDiv.appendChild(newRecipeDur);
            newRecipeDiv.appendChild(newRecipeDesc);
            newRecipeDiv.appendChild(newRecipeButtons);
            receptoInfoCon.appendChild(newRecipeDiv);
            newRecipeDeleteBtn.addEventListener('click', () => {
                deleteData(key);
            });
            newRecipeUpdateBtn.addEventListener('click', () => {
                const updatedRecipe = {
                    recipeName: newRecipeNameSpan.innerHTML,
                    recipeDuration: newRecipeDurSpan.innerHTML,
                    recipeDescription: newRecipePara.innerHTML
                };
                updateData(key, updatedRecipe);
            });
        });
    });
};
showAllRecipesBtn.onclick = loadData;
function deleteData(key) {
    fetch(`https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes/${key}.json`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((data) => {
        loadData();
        console.log('Receptas ištrintas');
    });
}
function updateData(key, update) {
    fetch(`https://recipedb-fc213-default-rtdb.europe-west1.firebasedatabase.app/recipes/${key}.json`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
    })
        .then((data) => {
        loadData();
        console.log('Receptas atnaujintas');
    });
}
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
