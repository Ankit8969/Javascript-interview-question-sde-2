const message = [
  {
    "id": 1,
    "title": "first title",
    "imageURL": "https://i.pravatar.cc/300",
    "orderId": "OD123",
    "messageList": [
      {
        "messageId": "msg1",
        "message": "Hi",
        "messageType": "text"
      },
      {
        "messageId": "msg2",
        "message": "need assistance",
        "messageType": "text"
      },
    ]
  },
  {
    "id": 2,
    "title": "second title",
    "imageURL": "https://i.pravatar.cc/200",
    "orderId": "OD456",
    "messageList": [
      {
        "messageId": "msg3",
        "message": "Hello",
        "messageType": "text"
      },
      {
        "messageId": "msg4",
        "message": "urgent request",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 3,
    "title": "third title",
    "imageURL": "https://i.pravatar.cc/340",
    "orderId": "OD789",
    "messageList": [
      {
        "messageId": "msg5",
        "message": "Hey there",
        "messageType": "text"
      },
      {
        "messageId": "msg6",
        "message": "can you help?",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 4,
    "title": "fourth title",
    "imageURL": "https://i.pravatar.cc/300",
    "orderId": "OD1011",
    "messageList": [
      {
        "messageId": "msg7",
        "message": "Greetings",
        "messageType": "text"
      },
      {
        "messageId": "msg8",
        "message": "looking for assistance",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 5,
    "title": "fifth title",
    "imageURL": "https://i.pravatar.cc/350",
    "orderId": "OD1213",
    "messageList": [
      {
        "messageId": "msg9",
        "message": "Hi there",
        "messageType": "text"
      },
      {
        "messageId": "msg10",
        "message": "need help",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 6,
    "title": "sixth title",
    "imageURL": "https://i.pravatar.cc/360",
    "orderId": "OD1415",
    "messageList": [
      {
        "messageId": "msg11",
        "message": "Greetings",
        "messageType": "text"
      },
      {
        "messageId": "msg12",
        "message": "urgent matter",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 7,
    "title": "seventh title",
    "imageURL": "https://i.pravatar.cc/370",
    "orderId": "OD1617",
    "messageList": [
      {
        "messageId": "msg13",
        "message": "Hello there",
        "messageType": "text"
      },
      {
        "messageId": "msg14",
        "message": "require assistance",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 8,
    "title": "eighth title",
    "imageURL": "https://i.pravatar.cc/380",
    "orderId": "OD1819",
    "messageList": [
      {
        "messageId": "msg15",
        "message": "Hi!",
        "messageType": "text"
      },
      {
        "messageId": "msg16",
        "message": "need your help",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 9,
    "title": "ninth title",
    "imageURL": "https://i.pravatar.cc/390",
    "orderId": "OD2021",
    "messageList": [
      {
        "messageId": "msg17",
        "message": "Hey!",
        "messageType": "text"
      },
      {
        "messageId": "msg18",
        "message": "require assistance urgently",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 10,
    "title": "tenth title",
    "imageURL": "https://i.pravatar.cc/280",
    "orderId": "OD2223",
    "messageList": [
      {
        "messageId": "msg19",
        "message": "Hello!",
        "messageType": "text"
      },
      {
        "messageId": "msg20",
        "message": "need immediate help",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 11,
    "title": "Eleventh title",
    "imageURL": "https://i.pravatar.cc/220",
    "orderId": "OD2021",
    "messageList": [
      {
        "messageId": "msg17",
        "message": "Hey!",
        "messageType": "text"
      },
      {
        "messageId": "msg18",
        "message": "require assistance urgently",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 12,
    "title": "Twelve title",
    "imageURL": "https://i.pravatar.cc/230",
    "orderId": "OD2223",
    "messageList": [
      {
        "messageId": "msg19",
        "message": "Hello!",
        "messageType": "text"
      },
      {
        "messageId": "msg20",
        "message": "need immediate help",
        "messageType": "text"
      }
    ]
  }
];
let currentSelectedContact = null;
// setting the style of contact section
function handleContactSection(contactListArray = message){
  let contactList = [];
  let contactSection = document.querySelector(".scrollableContact");
  contactSection.innerHTML = null;
  contactListArray.forEach((user)=>{
    const mainContactBox = document.createElement("div");
    mainContactBox.classList.add("mainContactBox");

    // adding the onCLick event listener to the box
    mainContactBox.addEventListener("click",()=> handleMessageSection(user.id))

    const userLogoBox = document.createElement("div");
    userLogoBox.classList.add("userLogoBox");

    const userDetailsBox = document.createElement("div");
    userDetailsBox.classList.add("userDetailsBox");
    const userName = document.createElement("p");
    userName.classList.add("userName");
    userName.innerHTML = user?.title;
    userDetailsBox.append(userName);

    const userLastMessage = document.createElement("p");
    userLastMessage.classList.add("userLastMessage");
    userLastMessage.innerHTML = "Hey there!";
    userDetailsBox.append(userLastMessage);

    const userImg = document.createElement('img');
    userImg.setAttribute('src', user?.imageURL);
    userImg.classList.add("userImg");
    userLogoBox.append(userImg);

    mainContactBox.append(userLogoBox);
    mainContactBox.append(userDetailsBox);
    contactList.push(mainContactBox);
  })
  console.log(contactList);
  contactSection.append(...contactList);
};


function handleMessageSection(index = 1){
  currentSelectedContact = index;
  const scrollableMessage = document.querySelector(".scrollableMessage");
  const mainMessageBox = document.createElement("div");
  scrollableMessage.innerHTML = null;
  mainMessageBox.classList.add("mainMessageBox");

  let messageArray = [];

  message[index-1]?.messageList.forEach((msg)=>{
    const messageText = document.createElement("div");
    messageText.classList.add("messageText");
    messageText.innerHTML = msg?.message;
    messageArray.push(messageText);
    const breakTag = document.createElement("br");
    messageArray.push(breakTag);
    console.log(msg?.message);
  })
  mainMessageBox.append(...messageArray);
  scrollableMessage.append(mainMessageBox)
}

function handleFilter(name)
{
  console.log(name);
  let filteredContact = message.filter((item)=>{
    if (item?.title.includes(name))
      return item;
  })
  handleContactSection(filteredContact);
}

function handleContactFilter(){
  const inputBox = document.querySelector('.contactSearchInputBox');
  console.log(inputBox);
  inputBox.addEventListener('keyup', (event)=>{
    handleFilter(event.target.value); 
  })
}

function handleMessageSend(){
  const inputBox = document.querySelector('.sendMessage');
  inputBox.addEventListener("keyup", (event)=>{
    if (event.key === "Enter"){
      if (event.target.value.trim() === "")
        return ;
      // message need to send
      message[currentSelectedContact-1].messageList.push({
        message: event.target.value
      })
      handleMessageSection(currentSelectedContact);
      event.target.value = null;
    }
  })
}

handleContactSection();
handleContactFilter();
handleMessageSend();





