module.exports = {
    name: "FTP Upload File",

    description: "Upload File To FTP",

    category: ".Enemy",

    

    inputs: [
	    {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the next block if your insert was successful.",
            "types": ["action"]
        },
	    {
            "id": "pathl",
            "name": "Local File Path",
            "description": "Type: Action\n\nDescription: Use C:\\Users\\You\\OneDrive\\file.txt...Path Format",
            "types": ["text"]
        },
	    {
            "id": "pathr",
            "name": "Remote File Path",
            "description": "Type: Action\n\nDescription: Use /remotepath/folder/file.txt...Path Format",
            "types": ["text"]
        },		
	    {
            "id": "host",
            "name": "Host",
            "description": "Type: Action\n\nDescription: FTP Host - Defaults to Port 21",
            "types": ["text"]
        },			
	    {
            "id": "user",
            "name": "FTP User",
            "description": "Type: Action\n\nDescription: FTP User",
            "types": ["text"]
        },				
	    {
            "id": "pass",
            "name": "FTP Password",
            "description": "Type: Action\n\nDescription: FTP Password",
            "types": ["text"]
        }		
		
	
		
	],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the next block if your insert was successful.",
            "types": ["action"]
        }


    ],
	
	
async code(cache) {
	
	
 
 let result1 = this.GetInputValue("pathl", cache);	
 let result2 = this.GetInputValue("pathr", cache);	
 let result3 = this.GetInputValue("host", cache);	
 let result4 = this.GetInputValue("user", cache);	
 let result5 = this.GetInputValue("pass", cache);	
 
 
      await this.require("basic-ftp")
      const ftp = require("basic-ftp") 
	  
	  
    async function uploadFileToFTP(localFile, remotePath) {
    const client = new ftp.Client()
	

    try {
        await client.access({
            host: result3,
            user: result4,
            password: result5,
            secure: true
			
	})
	
	 await client.uploadFrom(localFile, remotePath)
	}  
     catch(err) {
        console.log(err)
		
    }
    client.close()
}


     uploadFileToFTP(result1,result2)

     this.RunNextBlock("action", cache)

    }
}