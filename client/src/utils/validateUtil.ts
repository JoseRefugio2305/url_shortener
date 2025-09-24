
export function IsURL(url: string) {
     try {
          new URL(url);

          return true
     } catch {
          return false
     }
}

export function IsEmail(email: string) {
     const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;//Expresion para email
     return emailRegex.test(email);
}

export function valPass(pass: string) {
     const regexp_password: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/;//Expresion para password de 8 a 16 caracteres
     return regexp_password.test(pass)
}

export function valShortUrlCode(short_code: string) {
     const regexShort: RegExp = /^[A-Za-z0-9]{8}$/;//expresion para short_code de solo letras y digitos de 8 caracteres
     return regexShort.test(short_code)
}