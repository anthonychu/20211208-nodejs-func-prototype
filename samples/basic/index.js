const { App, azureBlobInput, azureBlobOutput } = require('../../lib/AzureFunctions')

const app = new App()

// maybe configure some options like this?
// does project stein allow worker to control host.json settings?
// func.options.http = {
//     'routePrefix': 'api',
// }

app.http({
    method: 'GET', // support multiple verbs?
    route: 'simple',
    async handler(context, req, res) {
        context.log('hi')
        res.json({
            message: 'Hello World!'
        })
    }
})

// shorthand methods for http verbs
app.get('simple-shorthand', async (context, req, res) => {
    return 'hello world'
})

// with bindings
app.http({
    method: 'GET',
    route: 'with-bindings',
    bindings: {
        inputFile: azureBlobInput({
            path: 'input/file.txt',
        }),
        outputFileTest: azureBlobOutput({
            path: 'output/file.txt'
        }),
        foo: azureBlobOutput({
            path = "dsfdsf"
        })
    },
    async handler(context, req, res, { inputFile, outputFileTest, foo }) {
        const inputData = inputFile.get()
        outputFileTest.set(inputData)
    },
})

// bindings can be separated
const bindings = {
    outputFile: azureBlobOutput({
        path: "out/out.txt"
    })
}

app.timer({
    name: 'timer-sample',
    schedule: "0 */1 * * * *",
    bindings,
    async handler(context, myTimer, { outputFile }) {
        outputFile.set('hello world')
        return 'timer fired'
    }
})

module.exports = app
