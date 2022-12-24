const isUpper = (char) => { 
    const titleArray = char.split(" ")
    const firstWord = titleArray[0]
    let rtn = false;
    if (firstWord === firstWord.toUpperCase()) rtn = true;
    return rtn;
}

const truncateText = (text) => {
    const MAX_LENGTH = 140;
    return text.substring(0, MAX_LENGTH) + '...';
}

const createSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeeiiiiooooouuuuncn-----";
    for (var i=0, l=from.length ; i<l ; i++) {
         str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US')
}

export const extractDataOfCaption = (caption) => {
    if(!caption) return
    let title = '', description = '', km, preview, slug, counter = 0

    const captionArray = caption.split("\n")
    
    for(const text of captionArray) {
      const uppercaseText = text.toUpperCase()
      
      //if(uppercaseText.includes("KM")) {
      //  km = text
      //  continue
      //}
      if(isUpper(text) && text !== '' && counter < 1) {
    	  title += text + " "
        slug = createSlug(title)
        counter++
        continue
      }
      if(text === '') continue 
      preview = truncateText(text)
      description += text + " "
    }
    
    return {
      km,
      title,
      slug,
      description,
      preview
    }
}
  