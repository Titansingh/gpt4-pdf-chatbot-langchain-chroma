import { Card, CardBody } from '@nextui-org/react';

function UserMessageCard({ message, user = true }) {
  const alignmentClass = user ? 'self-end' : 'self-start';

  return (
    <div className={`flex items-center ${alignmentClass} m-4`}>
      {/* New Chat Message Card */}
      <Card className={`m-2 max-w-80 `}>
        <CardBody>
          <p>
            {user ? 'User:' : 'Bot:'} {message}
          </p>
        </CardBody>
        {/* You can customize the CardFooter for timestamp, etc. if needed */}
      </Card>
    </div>
  );
}

export default UserMessageCard;
