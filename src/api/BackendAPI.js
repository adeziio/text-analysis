const freeflashUrl = process.env.REACT_APP_FREEFLASH_URL;

export const fetchSentimentAnalysis = async (text) => {
    try {
        const res = await fetch(freeflashUrl + "/sentiment-analysis?text=" + text, {
            "method": "GET",
            "headers": {
                "FREEFLASH_API_KEY": process.env.REACT_APP_FREEFLASH_API_KEY
            }
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

export const fetchSummarizeText = async (text) => {
    try {
        const res = await fetch(freeflashUrl + "/summarize-text?text=" + text, {
            "method": "GET",
            "headers": {
                "FREEFLASH_API_KEY": process.env.REACT_APP_FREEFLASH_API_KEY
            }
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

export const fetchLanguageDetection = async (text) => {
    try {
        const res = await fetch(freeflashUrl + "/language-detection?text=" + text, {
            "method": "GET",
            "headers": {
                "FREEFLASH_API_KEY": process.env.REACT_APP_FREEFLASH_API_KEY
            }
        })
        if (res.status === 200) {
            return await res.json();
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

export const fetchWebsiteExtraction = async (url) => {
    try {
        const res = await fetch("http://127.0.0.1:5000/website-extraction", {
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json',
                "FREEFLASH_API_KEY": process.env.REACT_APP_FREEFLASH_API_KEY
            },
            "body": JSON.stringify({
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
    catch (error) {
        return false;
    }
}

export const fetchFileExtraction = async (file) => {
    const formData = new FormData();
    formData.append("input_file", file);
    formData.append("language", "english");

    try {
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
    catch (error) {
        return false;
    }
}

