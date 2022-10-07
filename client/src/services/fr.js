import dayjs from "dayjs"

const localeObject = {
    name: 'fr', // name String
    weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'), // weekdays Array
    weekdaysShort: 'Sun_M'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
    weekdaysMin: 'Su_Mo'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
    weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
    yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'), // months Array
    monthsShort: 'Jan_F'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
    ordinal: n => `${n}º`, // ordinal Function (number) => return number + output
    formats: {
      // abbreviated format options allowing localization
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
      // lowercase/short, optional formats for localization
      l: 'D/M/YYYY',
      ll: 'D MMM, YYYY',
      lll: 'D MMM, YYYY h:mm A',
      llll: 'ddd, MMM D, YYYY h:mm A'
    },
    relativeTime: {
      // relative time format strings, keep %s %d as the same
      future: 'dans %s', // e.g. in 2 hours, %s been replaced with 2hours
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures', // e.g. 2 hours, %d been replaced with 2
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans'
    },
    meridiem: (hour, minute, isLowercase) => {
      // OPTIONAL, AM/PM
      return hour > 12 ? 'PM' : 'AM'
    }
  }

  dayjs.locale(localeObject, null, true)

  export default localeObject