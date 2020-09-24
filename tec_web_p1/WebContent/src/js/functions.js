$(document).ready(function () {
    doGet().then(fillDocument)
});

function doPost(title, text) {
    if (!!title.length && !!text.length) {
        const myInit = { method: "POST" };
        const baseUrl = window.location.href.replace('index.html', 'MyNotes?');
        const params = new URLSearchParams({
            title,
            text
        })
        fetch(`${baseUrl}${params.toString()}`, myInit)
            .then((response) => {
                console.log("Nota criada com sucesso;")
            })
            .catch((e) => { console.log("Algum erro ao criar a nota;") })
    }
}

async function doGet() {
	
	const myHeaders = new Headers({
		"Content-type":"application/json;charset=UTF-8"
	})
    const myInit = {
        method: "GET",
		headers: myHeaders
    };
    const baseUrl = window.location.href.replace('index.html', 'MyNotes?');
    return await fetch(baseUrl, myInit)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            try {
                // console.log(JSON.parse(res,))
                console.log(json)
                return json;
            } catch (e) {
                console.warn(e)
                console.log("Erro ao baixar nota; Provavelmente não existe nenhuma")
                return []
            }
        })
}

async function doDelete(id, callback = () => { }) {
    if (!!id.length) {
        const myInit = { method: "DELETE" };
        const baseUrl = window.location.href.replace('index.html', 'MyNotes?');
        const params = new URLSearchParams({
            id: Number(id)
        });
        fetch(`${baseUrl}${params.toString()}`, myInit)
            .then((response) => {
                console.log("Nota deletada com sucesso");
                callback();
            })
            .catch((e) => {
                console.warn(e)
                console.log("Erro ao deletetar nota;")
            })
    }
}

async function doPut(id, title, text) {
    if (!!title.length && !!text.length && id.length) {
        const myInit = { method: "PUT" };
        const baseUrl = window.location.href.replace('index.html', 'MyNotes?');
        const params = new URLSearchParams({
            id: Number(id),
            title,
            text
        })
        fetch(`${baseUrl}${params.toString()}`, myInit)
            .then((response) => {
                console.log("Nota atualizada com sucesso;")
            })
            .catch(e => {
                console.warn(e)
                console.log("Erro ao atualizar nota;")
            })
    }
}


function fillDocument(array) {
    const cardSpace = $(".inner-container")

    for (let note of array) {
        const data = {
            title: {
                placeholder: "Adicionar título",
                value: note.title
            },
            content: {
                placeholder: "Adicionar conteúdo",
                value: note.textContent.toString("utf8")
            },
            timestamp: note.timestamp,
            id: note.id,
            update: true
        }
        const card = $(Card(data))
        cardSpace.prepend(card);
    }
}


function editCard(node) {
    const inputField = node.parentNode.parentNode.parentNode.getElementsByTagName("input")[0]
    const textAreaField = node.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]
    const editGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0]
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]
    // const inputMedia = node.parentNode.parentNode.parentNode.getElementsByClassName("input-media")[0]


    $(inputField).removeAttr("readonly");
    $(textAreaField).removeAttr("readonly");
    $(inputField).attr({
        spellcheck: true
    });
    $(textAreaField).attr({
        spellcheck: true
    });
    $(editGroup).addClass("hidden")
    $(saveOrDeleteGroup).removeClass("hidden")

}

function createCard(node) {
    const inputField = node.parentNode.parentNode.parentNode.getElementsByTagName("input")[0];
    const textAreaField = node.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0];
    const editGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0];
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1];
    const saveButton = node.parentNode.parentNode.getElementsByClassName("header-button")[3];

    $(inputField).attr({
        readonly: true
    });
    $(textAreaField).attr({
        readonly: true
    });

    $(inputField).removeAttr("spellcheck");
    $(textAreaField).removeAttr("spellcheck");

    $(editGroup).removeClass("hidden")
    $(saveOrDeleteGroup).addClass("hidden")

    // implementar save do server
    const title = $(inputField).val();
    const text = $(textAreaField).val();
    doPost(title, text)


}

function updateNote(node) {
    const cardID = node.parentNode.parentNode.parentNode.getElementsByClassName("footer-id positive-text")[0]
    const inputField = node.parentNode.parentNode.parentNode.getElementsByTagName("input")[0]
    const textAreaField = node.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]
    const editGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0]
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]

    $(inputField).attr({
        readonly: true
    });
    $(textAreaField).attr({
        readonly: true
    });

    $(inputField).removeAttr("spellcheck");
    $(textAreaField).removeAttr("spellcheck");

    $(editGroup).removeClass("hidden")
    $(saveOrDeleteGroup).addClass("hidden")

    // implementar save do server
    const id = $(cardID).attr("id");
    const title = $(inputField).val();
    const text = $(textAreaField).val();
    doPut(id, title, text)

}

function createNote(node) {
    const inputField = node.parentNode.parentNode.parentNode.getElementsByTagName("input")[0]
    const textAreaField = node.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]
    const editGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0]
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]

    $(inputField).attr({
        readonly: true
    });
    $(textAreaField).attr({
        readonly: true
    });

    $(inputField).removeAttr("spellcheck");
    $(textAreaField).removeAttr("spellcheck");

    $(editGroup).removeClass("hidden")
    $(saveOrDeleteGroup).addClass("hidden")


    // implementar save do server
    const title = $(inputField).val();
    const text = $(textAreaField).val();
    doPost(title, text)
	window.location.reload();
}

function confirmDelete(node) {
    const saveOrDeleteGroup = node.parentNode
    const confirmGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[2]


    $(saveOrDeleteGroup).addClass("hidden")
    $(confirmGroup).removeClass("hidden")
}

function deleteCard(node) {
    const card = node.parentNode.parentNode.parentNode
    const cardID = node.parentNode.parentNode.parentNode.getElementsByClassName("footer-id positive-text")[0]

    // implementar delete do server
    const id = $(cardID).attr("id");
    doDelete(id, () => { $(card).remove(); })

}

function cancelDelete(node) {
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0]
    const confirmGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[2]

    $(confirmGroup).addClass("hidden")
    $(saveOrDeleteGroup).removeClass("hidden")
}

function createCard(node) {
    const cardSpace = $(".inner-container")
    const data = {
        title: {
            placeholder: "Adicionar título"
        },
        content: {
            placeholder: "Adicionar conteúdo"
        },
        update: false,
        id: ""
    }
    const card = $(Card(data))

    cardSpace.prepend(card);
}


function toggleButtonsWrapper(node) {
    const buttonsWrapper = node.getElementsByClassName("buttons-wrapper")[0];
    const currentDisplay = $(buttonsWrapper).css("display")

    if (currentDisplay == "none") {
        $(buttonsWrapper).css({
            display: "flex"
        })
    } else {
        $(buttonsWrapper).css({
            display: "none"
        })
    }
}

function search() {
	
    window.location.reload()
    console.log(randomID(20))
}

function randomID(length) {
    const numbers = "0123456789"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = lowercase.toUpperCase()

    const characters = numbers + lowercase + uppercase
    const charLength = characters.length

    const pseudoRandom = []
    while (pseudoRandom.length < length) {
        pseudoRandom.push(characters[Math.floor(Math.random() * charLength)])
    }
    return pseudoRandom.join("")
}

function Card(data) {
    const { title, content, timestamp, id, update } = data;
    const lastModified = timestamp || new Date().getTime();
    const cardID = id || "";
    const cardHtml = `<div class="card-outer">
    <div class="card-header" id="${cardID}">
    <!-- button de edição -->
    <div class="header-options">
        <button class="header-button" onclick="editCard(this)">
        <i class="fa fa-edit" aria-hidden="true" title="Editar"></i>
        </button>
        <button class="header-button" onclick="confirmDelete(this)">
        <i
            class="fa fa-trash negative-style"
            aria-hidden="true"
            title="Apagar"
        ></i>
        </button>
    </div>
    <!-- buttons de salvar ou apagar -->
    <div class="header-options hidden">
        <button class="header-button" onclick=${update ? "updateNote(this)" : "createNote(this)"}>
        <i
            class="fa fa-check neutral-style"
            aria-hidden="true"
            title="Salvar"
        ></i>
        </button>
    </div>
    <!-- buttons de confirmar apagar -->
    <div class="header-options hidden">
        <span style="margin-right: 10px; color: #666">Apagar nota?</span>
        <button class="header-button" onclick="deleteCard(this)">
            <!-- <i class="fa fa-thumbs-up positive-style" aria-hidden="true"></i> -->
            <span class="positive-style">Sim</span>
        </button>
        <button class="header-button" onclick="cancelDelete(this)">
            <span class="negative-style">Não</span>
            <!-- <i class="fa fa-thumbs-down negative-style" aria-hidden="true"></i> -->
        </button>
    </div>
</div>
    
    <input type="text" placeholder="${title.placeholder || ""}" value="${title.value || ""}" class="title" readonly />
    <textarea name="" class="content" placeholder="${content.placeholder || ""}" readonly>${content.value || ""}</textarea>
    <p class="footer">
        <span class="creation-time neutral-text" title="última modificação" onselect="(event) => {console.log(event)}" >${new Date(lastModified).toLocaleString()}</span>
        <span class="footer-id positive-text" id="${cardID}" >${cardID}</span>
    </p>
</div>`
    return cardHtml
} 