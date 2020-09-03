
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

function saveCard(node) {
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

}

function confirmDelete(node) {
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]
    const confirmGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[2]


    $(saveOrDeleteGroup).addClass("hidden")
    $(confirmGroup).removeClass("hidden")
}

function deleteCard(node) {
    const card = node.parentNode.parentNode.parentNode
    $(card).remove();
}

function cancelDelete(node) {
    const saveOrDeleteGroup = node.parentNode.parentNode.getElementsByClassName("header-options")[1]
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
        editMode: true
    }
    const card = $(Card(data))

    cardSpace.prepend(card);
}

function Card(data) {
    const { title, content, timestamp, editMode, id} = data;
    const lastModified = timestamp || new Date().getTime();
    const cardID = id || lastModified
    const cardHtml = `<div class="card-outer">
    <div class="card-header" id="${cardID}">
      <!-- button de edição -->
      <div class="header-options">
        <button class="header-button" onclick="editCard(this)">
          <i class="fa fa-edit" aria-hidden="true" title="Editar"></i>
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
        <button class="header-button" onclick="confirmDelete(this)">
          <i
            class="fa fa-trash negative-style"
            aria-hidden="true"
            title="Apagar"
          ></i>
        </button>
      </div>
      <!-- buttons de confirmar apagar -->
      <div class="header-options hidden">
        <span style="margin-right: 10px">Apagar nota?</span>
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
        <span class="creation-time" title="última modificação" onselect="(event) => {console.log(event)}" >${new Date(lastModified).toLocaleString()}</span>
        <span class="footer-id">${cardID}</span>
    </p>
    </div>`
    return cardHtml
} 