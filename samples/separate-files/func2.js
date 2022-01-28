const func = () => {}

func.timer('myTimerFunc', {
    schedule: "0 */1 * * * *",
    async handler (context, myTimer) {
        return 'timer fired'
    }
})

module.exports = func