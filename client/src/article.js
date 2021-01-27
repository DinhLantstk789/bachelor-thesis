import {Component, Fragment} from 'react';

class Article extends Component {
    state = {
        titleCheckedResult :'',
        enteredTitle :''
    }
    onTypingTitle = (event) =>{
        this.setState({enteredTitle:event.target.value});
        let n = event.target.value.length;
        if (n==1) {
            this.setState({titleCheckedResult: 'Title entry is required'});
        } else {
            this.setState({titleCheckedResult: ''});
        }
    }
    render() {
        return (
            <Fragment>
                <div className="panel panel-default">
                    <div className="panel-heading"><h3 className="panel-title">Add Article Form</h3></div>
                    <div className="panel-body">
                        <form role="form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Title</label>
                                <span>{this.state.titleCheckedResult}</span>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text" onChange={this.onTypingTitle}/>
                            </div>
                            <div className="form-group">
                                <label>Abstract</label>
                                <textarea className="form-control" rows="4"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel panel-detail">
                    <div className="panel-detail"><h3 className="panel-detail">Publication Details</h3></div>
                    <div className="panel-body">
                        <form role="form">
                            <div className="form-group">
                                <label className="col-md-3 control-label">Refereed</label>
                                <div className="col-md-9">
                                    <div className="radio-list">
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Yes,this version has been refereed
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            No, this version has not been refereed
                                        </label>

                                    </div>
                                </div>
                                <label className="col-md-3 control-label">Status</label>
                                <div className="col-md-9">
                                    <div className="radio-list">
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Published
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            In Press
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Submitted
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Unpublished
                                        </label>
                                    </div>
                                </div>
                                <label htmlFor="exampleInputEmail1">Jounal or Publication Title</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                                <label htmlFor="exampleInputEmail1">ISSN</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                                <label htmlFor="exampleInputEmail1">Publisher</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                                <label htmlFor="exampleInputEmail1">Offical URL</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                                <label htmlFor="exampleInputEmail1">Volume</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                                <label htmlFor="exampleInputEmail1">Number</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                                <label className="col-md-3 control-label">Date Type</label>
                                <div className="col-md-9">
                                    <div className="radio-list">
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Unspecified
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Publication
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            Submission
                                        </label>
                                        <label>
                                            <div className="radio">
                                                <span className="checked">
                                                    <input type="radio" name="optionsRadios" value="option1"
                                                           checked=""/>
                                                </span>
                                            </div>
                                            completion
                                        </label>
                                    </div>
                                </div>
                                <label htmlFor="exampleInputEmail1">Indentification Number</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Enter text"/>
                            </div>
                        </form>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Article;