import { validarDataNascimento } from "./validarDataNascimento.js";
import {validarCPF} from "./validarCPF.js"
import {recuperarEndereco} from "./recuperarEndereco.js"
import {validarPreco} from "./validarPreco.js"

const retornaMensagemDeErro = (tipo,validity) => {
  let mensagemDeErro = "";
  const tiposDeErro = ["valueMissing","typeMismatch" , "tooShort","rangeUnderflow","customError","patternMismatch"];

  const mensagensDeErro = {
    email: {
        valueMissing: "O e-mail é necessário",
        typeMismatch: "Este não é um e-mail válido"
    },
    senha: {
        valueMissing: "O senha é necessária",
        tooShort: "A senha deve ter no mínimo 4 caracteres"
    },
    dataNascimento: {
        valueMissing: "O data de nascimento é necessária",
        rangeUnderflow: "A data mínima é 01/01/1901",
        customError: "A idade mínima é de 18 anos"
    },
    cpf: {
        valueMissing: "O CPF é necessário",
        customError: "Este não é um CPF válido"
    },
    rg: {
        valueMissing: "O RG é necessário"
    },
    cep: {
        valueMissing: "O CEP é necessário",
        patternMismatch: "Este não é um cep válido",
        customError:"Este não é um cep válido"
    },
    logradouro: {
        valueMissing: "O logradouro é necessário"
    },
    cidade: {
        valueMissing: "A cidade é necessária"
    },
    estado: {
        valueMissing: "O estado é necessário"
    },
    nomeProduto: {
        valueMissing: "O nome é necessário"
    },
    preco: {
        valueMissing: "O preço é necessário",
        customError:"O valor do produto deve ser maior que R$ 0,00"
    },
};
  tiposDeErro.forEach(erro => {
    if(validity[erro]){
     mensagemDeErro =  mensagensDeErro[tipo][erro];

    }
  });
  return mensagemDeErro;
}
 
export const validarInput = (input,adicionarErro = true) => {
  const classeElementoErro = "erro-validacao";
  const classeInputErro = "possui-erro-validacao";
  const elementoPai = input.parentNode;
  const elementoErroExiste = elementoPai.querySelector(
    `.${classeElementoErro}`
  );
  const elementoErro = elementoErroExiste || document.createElement("div");

  const elementoValido = input.validity.valid;

  const tipo = input.dataset.tipo;
  const validadoresEspecificos = {
    dataNascimento: input => validarDataNascimento(input),
    cpf:input => validarCPF(input),
    cep: input => recuperarEndereco(input),
    preco: input => validarPreco(input)
  };

  if (validadoresEspecificos[tipo]) {
    validadoresEspecificos[tipo](input);
  }
  if (!elementoValido) {
    elementoErro.className = classeElementoErro; // retornaMensagemDeErro(tipo,input.validity); 
    elementoErro.textContent = retornaMensagemDeErro(tipo,input.validity)
    if(adicionarErro) {
        input.after(elementoErro);
        input.classList.add(classeInputErro);
    }
  } else {
      elementoErro.remove();
      input.classList.remove(classeInputErro);
  }
};
