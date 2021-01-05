<template>
  <div class="inputContainer">
    <div class="input">
      <input type="number" name="" id="firstNumber" v-model="firstNumber" />
    </div>
    <div class="input">
      <input type="number" name="" id="secondNumber" v-model="secondNumber" />
    </div>
    <br />
    <br />
    <div id="result">Résultat : {{ calculate() }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
    };
  },
  methods: {
    calculate() {
      if (
        isNaN(parseFloat(this.firstNumber)) &&
        isNaN(parseFloat(this.secondNumber))
      )
        return 0;
      if (isNaN(parseFloat(this.firstNumber))) return this.secondNumber;
      if (isNaN(parseFloat(this.secondNumber))) return this.firstNumber;

      return (this.result =
        parseFloat(this.firstNumber) + parseFloat(this.secondNumber));
    },
  },
};
</script>

<style scoped>
.inputContainer {
  margin-top: 10vh;
}

.input {
  margin-top: 5vh;
}
</style>
