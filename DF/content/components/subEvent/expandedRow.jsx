
// Displays the event details under each table row
class ExpandedRow extends React.Component{
    componentWillMount() {
        global.socket.emit('details', this.props.data.id, this.props.user);
    }

    render() {
        return(
            <div className="ExpandedRow">
                <h2 className="title">
                    {this.props.data.name}
                </h2>
                <div className="LnT">
                    <div>
                        <label>Location</label>
                        <div>
                            {this.props.data.location.name}
                        </div>
                        <div>
                            {this.props.data.location.address}
                        </div>
                        <div>
                            {`${this.props.data.location.city}, ${this.props.data.location.state}`}
                        </div>
                    </div>
                    <div className="time">
                        <label>Date and Time</label>
                        <div>
                            {(() => {
                                var date = new Date(this.props.data.date);
                                return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
                            })()}
                        </div>
                    </div>
                </div>
                <div className="desc">
                    <label>Description</label>
                    <div>
                        {this.props.data.description}
                    </div>
                </div>
                <div>
                    <label>Attending</label>
                    <input type="checkbox" checked={this.props.data.coming} onClick={e => global.socket.emit('rsvp', this.props.data.id, this.props.user, e.target.checked)}/>
                </div>
                <div>
                    <label>Comments</label>
                    <div>
                        {this.props.data.comments.map(com => {
                            return (
                                <div className="comment" key={com.from}>
                                    <label>{com.from}</label>
                                    <div>
                                        {com.text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

ExpandedRow.propTypes={
    data: PropTypes.object, // Row Data
    user: PropTypes.string.isRequired, // User
};

export default ExpandedRow;