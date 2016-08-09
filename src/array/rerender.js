import processRendering from './_processrendering';

// rerenders not rendered items in an array
// force rerender when forceRerender event option is truthy
export default function rerender(eventOptions={}) {
    const { renderIfPossible=true } = this;
	if (renderIfPossible) {
        processRendering({
            self: this,
            eventOptions: {
                method: 'rerender',
                added: [],
                removed: [],
                ...eventOptions
            }
        });
	}
}
