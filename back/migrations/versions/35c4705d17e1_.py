"""empty message

Revision ID: 35c4705d17e1
Revises: 670402e78fb3
Create Date: 2024-10-11 11:30:27.625773

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35c4705d17e1'
down_revision = '670402e78fb3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('password', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('email', sa.String(length=60), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.String(length=15), nullable=True))
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=25),
               existing_nullable=False)
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.create_unique_constraint(None, ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('name',
               existing_type=sa.String(length=25),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.drop_column('created_at')
        batch_op.drop_column('is_admin')
        batch_op.drop_column('phone')
        batch_op.drop_column('email')
        batch_op.drop_column('password')
        batch_op.drop_column('username')

    # ### end Alembic commands ###
