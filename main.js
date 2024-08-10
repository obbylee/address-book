import "./style.css";
import dataContacts from "./data.json";

const AddressBookService = () => {
  const collectionOfAddresses = document.querySelector("#addresses");

  function resetAddressBook() {
    collectionOfAddresses.innerHTML = "";
  }

  function getAddressBook() {
    const addresses = document.getElementById("addresses");
    dataContacts.forEach((contact) => {
      const article = document.createElement("article");
      article.className =
        "w-full flex flex-col border border-gray-500 rounded p-4";

      const title = document.createElement("h1");
      title.className = "font-medium text-xl";
      title.textContent = contact.fullName;

      const box = document.createElement("address");

      const phone = document.createElement("p");
      phone.textContent = contact.phone;
      const email = document.createElement("p");
      email.textContent = contact.email;
      const address = document.createElement("p");
      address.textContent = contact.address;

      box.append(phone, email, address);

      article.append(title, box);

      addresses.append(article);
    });
  }

  return {
    render: () => {
      getAddressBook();
    },
  };
};

AddressBookService().render();
