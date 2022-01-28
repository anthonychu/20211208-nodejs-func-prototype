const func = () => {}

func.http({
    method: 'GET',
    path: 'simple',
    async handler(context, req, res) {
        res.json({
            message: 'Hello World!'
        })
    }
})

func.get('simple-shorthand', async (context, req, res) => {
    return 'hello world'
})

func.http({
    method: 'GET',
    url: 'with-bindings',
    bindings: {
        inputFile: func.blobInput({
            path: 'input/file.txt'
        }),
        outputFile: func.blobOutput({
            path: 'output/file.txt'
        })
    },
    async handler (context, req, res) {
        context.bindings.outputFile = context.bindings.inputFile
        return 'hello world'
    },
})

module.exports = func