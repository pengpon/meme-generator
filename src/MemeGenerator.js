import React, { Component } from 'react'


class MemeGenerator extends Component{
  constructor () {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/261o3j.jpg",
      allImg:[],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => this.setState({
        allImg: data.data.memes
      })) 
  }

  handleChange(event) {
    console.log('change')
    const {name,value}=event.target
    this.setState({
      [name]:value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const randomNum = Math.floor(Math.random() * (this.state.allImg.length))
    
    this.setState({randomImg:(this.state.allImg)[randomNum].url})
    
  }

 
  render() {
    return (
        <div className="container ">
          <form className="form" onSubmit={this.handleSubmit}>
            <input name="topText" type="text" value={this.state.topText} onChange={this.handleChange}  placeholder="上方文字"/>
            <input name="bottomText" type="text" value={this.state.bottomText} onChange={this.handleChange} placeholder="下方文字"/>
            <button>換一張</button>
          </form>
          <div className="meme">
            <img src={this.state.randomImg}  alt="meme picture"/>
            <h2 className="top">{this.state.topText}</h2>
            <h2 className="bottom">{this.state.bottomText}</h2>
          </div>
        </div>
    )
  }

}
export default MemeGenerator