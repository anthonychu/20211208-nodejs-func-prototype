const func = () => {}

func.options = {
    'http': {
        'routePrefix': 'api',
    },
}

func.register(require('./func1'))
func.register(require('./func2'))

func.useMiddleware(/* register some middleware here*/)

module.exports = func
