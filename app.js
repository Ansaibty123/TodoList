const app = new Vue({
  el: "#app",
  data: {
    title: "TODO APP",
    newItem: "",
    newList: [],
  },

  computed: {
    atLeastOneChecked() {
      return this.newList.some((item) => item.done);
    },
    markUnmarkButton() {
      return this.markAllCheck ? "Unmark all" : "Mark all";
    },
    markAllCheck() {
      return this.newList.every((item) => item.done);
    },
  },

  methods: {
    handleSubmit() {
      this.newList.push({
        name: this.newItem,
        done: false,
      });
      this.newItem = "";
      this.addToSessionStorage();
    },

    removeItem(item) {
      const itemIndex = this.newList.indexOf(item);
      this.newList.splice(itemIndex, 1);
      this.addToSessionStorage();
    },

    toggleMark() {
      if (this.markAllCheck) {
        this.unMarkAll();
      } else {
        this.markAll();
      }
    },

    markAll() {
      this.newList.forEach((element) => (element.done = true));
      this.addToSessionStorage();
    },
    unMarkAll() {
      this.newList.forEach((element) => (element.done = false));
      this.addToSessionStorage();
    },
    showModal() {
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    hideModal() {
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
      this.unMarkAll();
    },
    deleteAll() {
      this.newList = this.newList.filter((item) => !item.done);
      this.addToSessionStorage();
      this.hideModal();
    },

    addToSessionStorage() {
      sessionStorage.setItem("todoList", JSON.stringify(this.newList));
    },

    getListFromSession() {
      const storeList = sessionStorage.getItem("todoList");
      if (storeList) {
        this.newList = JSON.parse(storeList);
      }
    },
  },
  created() {
    this.getListFromSession();
  },
  watch: {
    atLeastOneChecked: function (newValue) {
      const deleteAll = document.getElementById("deleteBtn");
      if (deleteAll) {
        deleteAll.style.display = newValue ? "inline-block" : "none";
      }
    },
  },
});
