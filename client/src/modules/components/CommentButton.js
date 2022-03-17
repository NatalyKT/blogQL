import { Button, Icon, Label } from 'semantic-ui-react'
import { MyPopup } from '../utils'

export const CommentButton = ({ commentCount, onClick }) => (
  <Button as='div' labelPosition='right' onClick={onClick}>
    <MyPopup content='Leave comment'>
      <Button basic color='blue'>
        <Icon name='comments' />
      </Button>
    </MyPopup>
    <Label basic color='blue' pointing='left'>
      {commentCount}
    </Label>
  </Button>
)
