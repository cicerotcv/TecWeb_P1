
// com jQuery :D

function handleSubmit() {
    const secretKey = $("#secretKey").val() || "";
    const password = $("#password").val();

    const myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    if (secretKey.length > 0) {
        $('.loading').removeClass('hide');
        $('#submit-button-text').addClass('hide');
        fetch(`https://instagram.com/${secretKey}`, myInit)
            .then((response) => {
                console.log(response)
                $('#submit-button-text').removeClass('hide');
                $('.loading').addClass('hide');
                return response.status
            })
            .then((status) => {
                $("#response-output").text(`Status code: ${status}\nRedirecting in 3s`)
                setTimeout(() => {
                    window.location.href = "/homepage"
                }, 3000)

            })
    }
}



function editCard(node) {
    const inputField = node.parentNode.parentNode.parentNode.getElementsByTagName("input")[0]
    const textAreaField = node.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]
    const editGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0]
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]
    const inputMedia = node.parentNode.parentNode.parentNode.getElementsByClassName("input-media")[0]


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
    console.log(inputMedia)
    $(inputMedia).css({
        display: "flex"
    })

}

function saveCard(node) {
    const inputField = node.parentNode.parentNode.parentNode.getElementsByTagName("input")[0]
    const textAreaField = node.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]
    const editGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[0]
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]
    const inputMedia = node.parentNode.parentNode.parentNode.getElementsByClassName("input-media")[0]

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
    $(inputMedia).css({
        display: "none"
    })
    // implementar save do server

}

function confirmDelete(node) {
    const saveOrDeleteGroup = node.parentNode
    const confirmGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[2]


    $(saveOrDeleteGroup).addClass("hidden")
    $(confirmGroup).removeClass("hidden")
}

function deleteCard(node) {
    const card = node.parentNode.parentNode.parentNode
    $(card).remove();
    // implementar delete do server
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
        editMode: true,
        id: randomID(20)
    }
    const card = $(Card(data))

    cardSpace.prepend(card);
}

function deleteMediaItem(node) {
    const mediaItem = node.parentNode.parentNode
    $(mediaItem).remove()
    // implementar delete do server
}

function toggleMediaView(node) {
    const mediaWrapper = $(node)
    const currentHeight = mediaWrapper.css("height");
    console.log(currentHeight)
}
function toggleButtonsWrapper(node) {
    const buttonsWrapper = node.getElementsByClassName("buttons-wrapper")[0];
    const currentDisplay = $(buttonsWrapper).css("display")
    console.log(currentDisplay)

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
    const { title, content, timestamp, editMode, id } = data;
    const lastModified = timestamp || new Date().getTime();
    const cardID = id || lastModified
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
    <button class="header-button" onclick="saveCard(this)">
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
    <div class="media-wrapper" onclick="toggleMediaView(this)">
        <div class="media-item" onclick="toggleButtonsWrapper(this)">
            <div class="buttons-wrapper">
                <button onclick="deleteMediaItem(this)" class="delete-media negative-text">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button onclick="deleteMediaItem(this)" class="open-media neutral-text">
                    <i class="fa fa-expand" aria-hidden="true"></i>
                </button>
            </div>
            <img src="https://picsum.photos/seed/${randomID(4)}/200/300" height="100px" onclick="showMedia(this)" class="card-media-item">
        </div>
        <div class="media-item" onclick="toggleButtonsWrapper(this)">
            <div class="buttons-wrapper" >
                <button onclick="deleteMediaItem(this)" class="delete-media negative-text">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button onclick="deleteMediaItem(this)" class="open-media neutral-text">
                    <i class="fa fa-expand" aria-hidden="true"></i>
                </button>
            </div>
            <img src="https://picsum.photos/seed/${randomID(4)}/500/300" height="100px" onclick="showMedia(this)" class="card-media-item">
        </div>
        <label class="input-media" for="media-item">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <input type="file" name="media-item" id="media-item" class="invisible-input"/>
        </label>
    </div>
    
    <input type="text" placeholder="${title.placeholder || ""}" value="${title.value || ""}" class="title" readonly />
    <textarea name="" class="content" placeholder="${content.placeholder || ""}" readonly>${content.value || ""}</textarea>
    <p class="footer">
        <span class="creation-time neutral-text" title="última modificação" onselect="(event) => {console.log(event)}" >${new Date(lastModified).toLocaleString()}</span>
        <span class="footer-id positive-text">${cardID}</span>
    </p>
    </div>`
    return cardHtml
} 