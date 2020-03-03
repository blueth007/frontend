/**
 *  路由懒加载原理说明
 * 
  import Loadable from 'react-loadable';
import Loading from './my-loading-component';
 
const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});
 
export default class App extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}
 * 
 * 
 */
import React from 'react'

const Loadable = ({
  loader,
  loading
}) => {
  return class LoadableComponent extends React.Component {
    state = {
      LoadedComponent: null
    }


    componentWillMount() {
      loader().then(resp => {
        console.log(resp)
        this.setState({
          LoadedComponent:resp.default
        })
      })
    }


    render() {
      const { LoadedComponent } = this.state;
      return (

        LoadedComponent ? <LoadedComponent /> : <div>Loading...</div>

      )
    }
  }
}

export default  Loadable;
