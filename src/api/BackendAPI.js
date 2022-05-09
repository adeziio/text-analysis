export const fetchSentimentAnalysis = async (text) => {
    const res = await fetch(`https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1`, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        },
        "body": JSON.stringify({
            "language": "english",
            "text": text
        })
    })
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return false;
    }
}

export const fetchSummarizeText = async (text) => {
    const res = await fetch(`https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1`, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        },
        "body": JSON.stringify({
            "language": "english",
            "text": text
        })
    })
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return false;
    }
}

export const fetchLanguageDetection = async (text) => {
    const res = await fetch(`https://text-analysis12.p.rapidapi.com/language-detection/api/v1.1`, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        },
        "body": JSON.stringify({
            "text": text
        })
    })
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return false;
    }
}

export const fetchWebsiteExtraction = async (url) => {
    const res = await fetch(`https://text-analysis12.p.rapidapi.com/website-extraction/api/v1.3`, {
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        },
        "body": new URLSearchParams({
            "language": "english",
            "url": url
        })
    })
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return false;
    }
}

export const fetchFileExtraction = async (file) => {
    const formData = new FormData();
    formData.append("input_file", file);
    formData.append("language", "english");

    const res = await fetch(`https://text-analysis12.p.rapidapi.com/text-mining/api/v1.1`, {
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
        },
        "body": formData
    })
    if (res.status === 200) {
        return await res.json();
    }
    else {
        return false;
    }
}

