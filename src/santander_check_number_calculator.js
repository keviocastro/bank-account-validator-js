(function(window) {
    var Moip = window.Moip || {};
    window.Moip = Moip;
  
    function SantanderCheckNumberCalculator() {
      if ( !( this instanceof SantanderCheckNumberCalculator ) ) {
        return new SantanderCheckNumberCalculator();
      }
    }
  
    SantanderCheckNumberCalculator.prototype = {
  
      calculate: function(agencyNumber, accountNumber) {

        agencyNumber += '00';
        var numbers = (agencyNumber+accountNumber).split("");
        var sumSeq = 0;
        var sequence = 0;
        for (var i = 0; i < numbers.length; i++) {
          var number = parseInt(numbers[i]);
          sequence = this.multiplyAccordingParity(number, i);
          sequence = this.adjustAccordingLength(sequence);
          sumSeq += sequence;
        }
        return this.module(sumSeq);
      },
  
      multiplyAccordingParity: function(number, index) {
        var multiplier;
        var result;
        switch (index) {
            case 0:
            case 6:
            case 11:
                multiplier = 9;
                break;
            case 1:
            case 7:
            case 12:
                multiplier = 7;
                break;
            case 2:
            case 9:
            case 11:
            case 13:
                multiplier = 3;
                break;
            case 3:
            case 8:
            case 10:
                multiplier = 1;
                break;
            case 4:
            case 5:
                multiplier = 0;
                break;
            default:
                break;
        }
        
        return Math.floor(((number * multiplier) / 1) % 10);
      },
  
      adjustAccordingLength: function(sequence) {
        if(sequence > 9) {
          var numbers = sequence.toString().split("");
          sequence = 0;
          for (var i = 0; i < numbers.length; i++) {
            sequence += parseInt(numbers[i]);
          }
        }
        return sequence;
      },
  
      module: function(sumSeq) {
        var module = sumSeq % 10;
        if(module === 0) {
          return "0";
        } else {
          return (10 - module).toString();
        }
      }
    };
  
    Moip.SantanderCheckNumberCalculator = SantanderCheckNumberCalculator();
  
  })(window);