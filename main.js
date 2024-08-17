import "./style.css";

const AddressBookService = () => {
  const collectionOfAddresses = document.querySelector("#addresses");

  document.querySelector("#addContact").addEventListener("click", () => {
    resetForm();
    document.querySelector("#modal").classList.remove("hidden");
  });

  document.querySelector("#btnCloseModal").addEventListener("click", () => {
    document.querySelector("#modal").classList.add("hidden");
  });

  document.querySelector("#btnReset").addEventListener("click", () => {
    resetAddressBook();
    const currentContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    getAddressBook(currentContacts);
  });

  document.querySelector("#btnSearch").addEventListener("click", () => {
    const searchValue = document.querySelector(
      "input[name='searchInput']"
    ).value;

    const currentContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const filtered = currentContacts.filter((val) => {
      return (
        val.fullName.toLowerCase() == searchValue.toLowerCase() ||
        val.phone.toLowerCase() == searchValue.toLowerCase() ||
        val.email.toLowerCase() == searchValue.toLowerCase() ||
        val.address.toLowerCase() == searchValue.toLowerCase()
      );
    });

    getAddressBook(filtered);
  });

  document.querySelector("#btnSave").addEventListener("click", () => {
    if (
      !document.querySelector("input[name='fullname']").value ||
      !document.querySelector("input[name='phone']").value ||
      !document.querySelector("input[name='email']").value ||
      !document.querySelector("input[name='address']").value
    ) {
      alert("field cannot be empty!");
      return;
    }

    saveContacts();
  });

  function resetForm() {
    document.querySelector("input[name='id']").value = "";
    document.querySelector("input[name='fullname']").value = "";
    document.querySelector("input[name='phone']").value = "";
    document.querySelector("input[name='email']").value = "";
    document.querySelector("input[name='address']").value = "";
  }

  function resetAddressBook() {
    collectionOfAddresses.innerHTML = "";
  }

  function saveToLs(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
  }

  function getAddressBook(data) {
    resetAddressBook();
    const addresses = document.getElementById("addresses");
    data.forEach((contact) => {
      const article = document.createElement("article");
      article.className = "p-2 border border-gray-500 rounded";

      const header = document.createElement("div");
      header.className = "flex items-center";

      const title = document.createElement("h1");
      title.textContent = contact.fullName;
      title.className = "flex-1 font-medium text-xl";

      const btnEdit = document.createElement("span");
      btnEdit.textContent = "Edit";
      btnEdit.className = "p-2 text-yellow-500 cursor-pointer";
      btnEdit.addEventListener("click", () => {
        document.querySelector("input[name='id']").value = contact.id;
        document.querySelector("input[name='fullname']").value =
          contact.fullName;
        document.querySelector("input[name='phone']").value = contact.phone;
        document.querySelector("input[name='email']").value = contact.email;
        document.querySelector("input[name='address']").value = contact.address;
        document.querySelector("#modal").classList.remove("hidden");
      });

      const btnDelete = document.createElement("span");
      btnDelete.textContent = "Delete";
      btnDelete.className = "p-2 text-rose-500 cursor-pointer";
      btnDelete.addEventListener("click", () => {
        if (confirm("Are you sure ?")) {
          deleteContact(contact.id);
          return;
        }
      });

      const box = document.createElement("address");

      const phone = document.createElement("p");
      phone.textContent = contact.phone;
      const email = document.createElement("p");
      email.textContent = contact.email;
      const address = document.createElement("p");
      address.textContent = contact.address;

      box.append(phone, email, address);

      header.append(title, btnEdit, btnDelete);

      article.append(header, box);

      addresses.append(article);
    });
  }

  function saveContacts() {
    const currentValues = {
      id: document.querySelector("input[name='id']").value,
      fullName: document.querySelector("input[name='fullname']").value,
      phone: document.querySelector("input[name='phone']").value,
      email: document.querySelector("input[name='email']").value,
      address: document.querySelector("input[name='address']").value,
    };

    const currentContacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const isExist = currentContacts.find((val) => {
      return parseInt(val.id) === parseInt(currentValues.id);
    });

    if (isExist) {
      isExist.fullName = currentValues.fullName;
      isExist.phone = currentValues.phone;
      isExist.email = currentValues.email;
      isExist.address = currentValues.address;

      saveToLs("contacts", currentContacts);
      getAddressBook(currentContacts);
      document.querySelector("#modal").classList.add("hidden");
      return;
    } else {
      currentValues.id = Date.now();

      currentContacts.push(currentValues);

      saveToLs("contacts", currentContacts);

      getAddressBook(currentContacts);

      document.querySelector("#modal").classList.add("hidden");
      return;
    }
  }

  function deleteContact(id) {
    const currentContacts = JSON.parse(localStorage.getItem("contacts"));

    const contactIsExist = currentContacts.find(
      (val) => parseInt(val.id) === parseInt(id)
    );

    if (!contactIsExist) {
      alert("contact is not found");
      return;
    }

    const index = currentContacts.indexOf(contactIsExist);

    currentContacts.splice(index, 1);

    saveToLs("contacts", currentContacts);

    getAddressBook(currentContacts);
    return;
  }

  return {
    render: (data) => {
      getAddressBook(data);
    },
  };
};

const currentContacts = localStorage.getItem("contacts");

const dataContactStorage = currentContacts ? JSON.parse(currentContacts) : [];

AddressBookService().render(dataContactStorage);
