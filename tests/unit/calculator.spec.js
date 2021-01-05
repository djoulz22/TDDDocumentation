import { shallowMount } from "@vue/test-utils";
import Calculator from "../../src/components/Calculator";

const factory = (values = {}) => {
  return shallowMount(Calculator, {
    data() {
      return {
        ...values,
      };
    },
  });
};

describe("Calculator", () => {
  //Init tests
  it("must exists", () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
  });

  it("must contains the input for the first element", () => {
    const wrapper = factory();
    expect(wrapper.find("#firstNumber").exists()).toBe(true);
  });

  it("must contains the input for the second element", () => {
    const wrapper = factory();
    expect(wrapper.find("#secondNumber").exists()).toBe(true);
  });

  it("must contains a div containing the result", () => {
    const wrapper = factory();
    expect(wrapper.find("#result").exists()).toBe(true);
  });

  //Data tests
  it("must contains a data firstElement equal to 0", () => {
    const wrapper = factory();
    expect(wrapper.vm.firstNumber).toEqual(0);
  });

  it("must contains a data secondElement equal to 0", () => {
    const wrapper = factory();
    expect(wrapper.vm.secondNumber).toEqual(0);
  });

  it("must contains a data result equal to 0", () => {
    const wrapper = factory();
    expect(wrapper.vm.result).toEqual(0);
  });

  //Checking v-models
  it("must have the first input binded on the firstNumber property", () => {
    const wrapper = factory({ firstNumber: 1 });
    expect(wrapper.find("#firstNumber").element.value).toEqual("1");
  });

  it("must have the second input binded on the seondNumber property", () => {
    const wrapper = factory({ secondNumber: 2 });
    expect(wrapper.find("#secondNumber").element.value).toEqual("2");
  });

  //Calculate
  it("must calculate the sum of the two numbers if there is two numbers", () => {
    const wrapper = factory({
      firstNumber: 1,
      secondNumber: 3,
    });
    expect(wrapper.vm.calculate()).toBe(4);
  });

  it("must return the firstElement if the second isNaN", () => {
    const wrapper = factory({
      firstNumber: 1,
      secondNumber: null,
    });
    expect(wrapper.vm.calculate()).toBe(1);
  });

  it("must return the secondElement if the first isNaN", () => {
    const wrapper = factory({
      firstNumber: 3,
      secondNumber: ["test", "ok"],
    });
    expect(wrapper.vm.calculate()).toBe(3);
  });

  it("must return the 0 if the first isNaN and the second isNaN", () => {
    const wrapper = factory({
      firstNumber: null,
      secondNumber: ["test", "ok"],
    });
    expect(wrapper.vm.calculate()).toBe(0);
  });
});
