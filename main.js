const esSigno = (a) => { return a == "+" || a == "-" || a == "*" || a == "/" }


class mathExpresion{
    expresion = "";
    signo = -1;

    operar(a, b, sign){
        switch (sign) {
            case '*':
                return a*b
            case '/':
                return a/b;
            case '+':
                return a+b;
            case '-':
                return a-b;
        }
    }

    signoDom(a, b){
        for(let c = 0; c < this.expresion.length; c++) {
            if(this.expresion.charAt(c) == a || this.expresion.charAt(c) == b){
                return c;
            }
        }
        if(a == '*'){
                    return this.signoDom('+', '-')
        } 
        return -1;
    }

    clean(){
        this.expresion = "";
        document.getElementById("ans-container").innerHTML = "0";
    }

    delet(){
        this.expresion = this.expresion.substring(0, this.expresion.length -1);
        document.getElementById("ans-container").innerHTML = this.expresion;
    }

    calcular(){
        let indexA, indexB;
        while( (this.signo = this.signoDom( '*', '/')) != -1){
            for(indexA = this.signo-1; indexA >= 0; indexA--){
                if(esSigno(this.expresion[indexA])){
                    break;
                }        
            } 
            ++indexA;
            let a = parseFloat(this.expresion.substring(indexA, this.signo), 10);
            console.log(a);
            for(indexB = this.signo+1; indexB < this.expresion.length; indexB++){
                if(esSigno(this.expresion[indexB])){
                    break;
                }
            }
            indexB--; 
            let b = parseFloat(this.expresion.substring(this.signo+1, indexB+1), 10);
            console.log(b);
            let copy  = this.expresion;
            this.expresion = "";
            if(indexA != 0){
                this.expresion += copy.substring(0, indexA);
            }

            this.expresion += this.operar(a, b, copy[this.signo]);

            if(indexB != copy.length-1){
                this.expresion += copy.substring(indexB+1, copy.length)
            }
        }
        console.log(this.expresion);
        document.getElementById("ans-container").innerHTML = this.expresion;
    }
}

const problema = new mathExpresion;

function instanciar(a){
    problema.expresion += a;
    document.getElementById("ans-container").innerHTML = problema.expresion;
}