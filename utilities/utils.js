module.exports = {
  formatResponse: (buzzer, lcd_line1 = '', lcd_line2 = '', lcd_line3 = '', lcd_line4 = '', printer = '') => {

    //console.log(Error(lcd_line1));
    let B, ret = '';
    if (buzzer === '3' || buzzer === 'A') {
      buzzer = 'A';
      B = 'B`';
    } else if (buzzer === 1) {
      B = '';
      buzzer = 'A';
    } else {
      buzzer = 'E';
      B = 'B`';
    }

    ret += '{' + B + buzzer + '`}';
    lcd_line1 = lcd_line1.trim();
    lcd_line2 = lcd_line2.trim();
    lcd_line3 = lcd_line3.trim();
    lcd_line4 = lcd_line4.trim();

    if ((lcd_line1 + lcd_line2 + lcd_line3 + lcd_line4).length > 0) {
      ret += '{L`';
      if (lcd_line1.length > 0) {
        ret += '[1`' + lcd_line1 + '`]';
      }
      if (lcd_line2.length > 0) {
        ret += '[2`' + lcd_line2 + '`]';
      }
      if (lcd_line3.length > 0) {
        ret += '[3`' + lcd_line3 + '`]';
      }
      if (lcd_line4.length > 0) {
        ret += '[4`' + lcd_line4 + '`]';
      }
      ret += '`}';
    }
    printer = printer.trim();

    if (printer.length > 10) {
      ret += '{P`' + '[T`' + printer + '`]`}';
    }

    return ret;

  },

};
